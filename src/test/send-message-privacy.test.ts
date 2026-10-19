import { afterEach, describe, expect, it, vi } from "vitest";

vi.mock("@lovable.dev/mcp-js", () => ({ defineTool: (tool: unknown) => tool }));

import sendMessage from "@/lib/mcp/tools/send-message";
import type { ToolContext } from "@lovable.dev/mcp-js";

describe("send_message privacy", () => {
  afterEach(() => vi.restoreAllMocks());

  it("does not write private communications or identity to logs", async () => {
    const spies = ["log", "info", "warn", "error", "debug"].map((method) =>
      vi.spyOn(console, method as "log").mockImplementation(() => {}),
    );
    const ctx = {
      isAuthenticated: () => true,
      getUserEmail: () => "fixture@example.test",
      getUserId: vi.fn(() => "fixture-user"),
    };
    const result = await sendMessage.handler(
      { subject: "Private fixture subject", body: "Private fixture body" },
      ctx as unknown as ToolContext,
    );
    expect(result.structuredContent).toEqual({ ok: true });
    for (const spy of spies) expect(spy).not.toHaveBeenCalled();
    expect(ctx.getUserId).not.toHaveBeenCalled();
  });

  it("retains the authentication requirement", async () => {
    const ctx = { isAuthenticated: () => false, getUserEmail: vi.fn() };
    const result = await sendMessage.handler(
      { subject: "Fixture", body: "Fixture" },
      ctx as unknown as ToolContext,
    );
    expect(result.isError).toBe(true);
    expect(ctx.getUserEmail).not.toHaveBeenCalled();
  });
});