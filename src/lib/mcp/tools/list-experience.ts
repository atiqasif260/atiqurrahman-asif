import { defineTool } from "@lovable.dev/mcp-js";

export default defineTool({
  name: "list_experience",
  title: "List experience",
  description: "Return Atiqur Rahman Asif's professional experience history.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => {
    const experience = [
      {
        period: "04/2023 — Present",
        title: "Executive, IT Department",
        company: "Ztrios Technologies LTD",
        highlights: [
          "System administration across networks and software",
          "Strategic planning aligning IT with business goals",
          "Security policies and data integrity",
          "Vendor management and IT budgeting",
          "Leading IT projects and system migrations",
        ],
      },
      {
        period: "02/2022 — 03/2023",
        title: "Jr. Executive, IT Department",
        company: "Circle Network",
        highlights: [
          "LAN/WAN networking and server management",
          "Security protocols and data backups",
          "User hardware/software support",
        ],
      },
    ];
    return {
      content: [{ type: "text", text: JSON.stringify(experience, null, 2) }],
      structuredContent: { experience },
    };
  },
});
