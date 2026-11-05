import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";
import { GatewayError, streamResponse } from "npm:@lovable.dev/ai-gateway@0.1.11";
import { createUIMessageStream, createUIMessageStreamResponse, type UIMessage } from "npm:ai@7.0.159";
import { z } from "npm:zod@^4.4.3";
import { buildSystemPrompt } from "../_shared/portfolio-knowledge.ts";

const RUN_ID_HEADER = "X-Lovable-AIG-Run-ID";

// Visitor questions about Atiq's experience and skills. Public endpoint —
// visitors are not signed in — so the request is validated strictly here.
const BodySchema = z.object({
  messages: z
    .array(
      z.object({
        role: z.enum(["user", "assistant"]),
        parts: z.array(
          z.object({
            type: z.string(),
            text: z.string().optional(),
          }),
        ),
      }),
    )
    .min(1, "At least one message is required.")
    .max(40, "Too many messages."),
});

function textOf(message: z.infer<typeof BodySchema>["messages"][number]): string {
  return message.parts
    .filter((part) => part.type === "text" && typeof part.text === "string")
    .map((part) => part.text)
    .join("\n")
    .slice(0, 4000);
}

function isAbort(error: unknown): boolean {
  return (
    error instanceof DOMException && error.name === "AbortError"
  ) || reqAborted(error);
}

let abortSignal: AbortSignal | undefined;

function reqAborted(error: unknown): boolean {
  return Boolean(abortSignal?.aborted) && error instanceof Error;
}

function errorStatus(error: unknown): number {
  if (error instanceof GatewayError) {
    return error.httpStatus ?? 500;
  }
  return 500;
}

Deno.serve(async (req) => {
  abortSignal = req.signal;
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed." }), {
      status: 405,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  let parsed: z.infer<typeof BodySchema>;
  try {
    parsed = BodySchema.safeParse(await req.json()).data as typeof parsed;
    if (!parsed) {
      return new Response(
        JSON.stringify({ error: "Send a JSON body with a 'messages' array." }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }
  } catch {
    return new Response(JSON.stringify({ error: "Invalid request body." }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const input = parsed.messages
    .map((message) => ({ role: message.role, content: textOf(message) }))
    .filter((item) => item.content.trim().length > 0);

  if (input.length === 0) {
    return new Response(JSON.stringify({ error: "Send a question to ask about Atiq." }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  try {
    const gatewayStream = await streamResponse(
      {
        model: "openai/gpt-6-astra",
        instructions: buildSystemPrompt(),
        input,
        reasoning: { effort: "low" },
      },
      {
        signal: req.signal,
        runId: req.headers.get(RUN_ID_HEADER)?.trim() || undefined,
      },
    );

    const uiStream = createUIMessageStream<UIMessage>({
      execute: async ({ writer }) => {
        writer.write({ type: "start" });
        writer.write({ type: "start-step" });
        const textId = "answer-0";
        let opened = false;
        let refusal = "";
        try {
          for await (const event of gatewayStream) {
            if (event.type === "response.output_text.delta") {
              if (!opened) {
                writer.write({ type: "text-start", id: textId });
                opened = true;
              }
              writer.write({ type: "text-delta", id: textId, delta: event.delta });
            } else if (event.type === "response.refusal.delta") {
              refusal += event.delta;
            }
          }
        } catch (error) {
          if (!isAbort(error)) throw error;
        }
        if (refusal && !opened) {
          // Provider refusal: surface it as the answer text, not a fake reply.
          writer.write({ type: "text-start", id: textId });
          writer.write({ type: "text-delta", id: textId, delta: refusal.trim() || "The assistant could not answer this question." });
          writer.write({ type: "text-end", id: textId });
          opened = true;
        }
        if (opened) writer.write({ type: "text-end", id: textId });
        writer.write({ type: "finish-step" });
        writer.write({ type: "finish" });
      },
      onError: (error) => (isAbort(error) ? "Request stopped." : "Something went wrong. Please try again."),
    });

    const headers = new Headers(corsHeaders);
    headers.set("Content-Type", "text/event-stream");
    if (gatewayStream.runId) {
      headers.set(RUN_ID_HEADER, gatewayStream.runId);
      const exposed = new Set(
        (headers.get("Access-Control-Expose-Headers") ?? "").split(",").map((h) => h.trim()).filter(Boolean),
      );
      exposed.add(RUN_ID_HEADER);
      headers.set("Access-Control-Expose-Headers", [...exposed].join(", "));
    }
    return createUIMessageStreamResponse({ stream: uiStream, headers });
  } catch (error) {
    if (isAbort(error)) {
      return new Response(null, { status: 499, headers: corsHeaders });
    }
    const status = errorStatus(error);
    console.error("ask-ai gateway error:", status, error instanceof GatewayError ? error.code : "unknown");
    return new Response(
      JSON.stringify({
        error:
          status === 402
            ? "The AI assistant is out of credits right now. Please try again later."
            : status === 429
              ? "The assistant is receiving too many questions right now. Please try again in a moment."
              : "Something went wrong. Please try again.",
      }),
      { status, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }
});
