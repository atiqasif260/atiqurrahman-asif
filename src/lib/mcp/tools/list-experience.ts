import { defineTool } from "@lovable.dev/mcp-js";
import { experiences } from "../../experience";

export default defineTool({
  name: "list_experience",
  title: "List experience",
  description: "Return Atiqur Rahman Asif's professional experience history.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => {
    const experience = experiences.map(({ tasks, suggestedResponsibilities, ...entry }) => ({
      ...entry,
      highlights: tasks,
      ...(suggestedResponsibilities
        ? { responsibilityContext: "Research-based QMS focus areas; not verified personal achievements." }
        : {}),
    }));
    return {
      content: [{ type: "text", text: JSON.stringify(experience, null, 2) }],
      structuredContent: { experience },
    };
  },
});
