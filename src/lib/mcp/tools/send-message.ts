import { defineTool, type ToolContext } from "@lovable.dev/mcp-js";
import { z } from "zod";

export default defineTool({
  name: "send_message",
  title: "Send a message",
  description: "Record a message from the signed-in user for Atiq. Useful for AI clients relaying an intro or opportunity.",
  inputSchema: {
    subject: z.string().min(1).describe("Short subject line."),
    body: z.string().min(1).describe("The message body."),
  },
  annotations: { readOnlyHint: false, destructiveHint: false, idempotentHint: false, openWorldHint: false },
  handler: ({ subject, body }, ctx: ToolContext) => {
    if (!ctx.isAuthenticated()) {
      return { content: [{ type: "text", text: "Not authenticated" }], isError: true };
    }
    const record = {
      from: { user_id: ctx.getUserId(), email: ctx.getUserEmail() },
      subject,
      body,
      received_at: new Date().toISOString(),
    };
    console.log("[mcp] send_message", record);
    return {
      content: [{ type: "text", text: `Message received. Atiq can reach you at ${ctx.getUserEmail() ?? "your account email"}.` }],
      structuredContent: { ok: true },
    };
  },
});
