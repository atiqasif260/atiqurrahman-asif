import { defineTool } from "@lovable.dev/mcp-js";

export default defineTool({
  name: "list_education",
  title: "List education",
  description: "Return Atiqur Rahman Asif's education and certifications.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => {
    const education = [
      { year: "2021", degree: "B.Tech in Computer Science & Engineering", institution: "Lovely Professional University (LPU)", detail: "CGPA: 3.75/4.00" },
      { year: "2017", degree: "Higher Secondary School Certificate", institution: "Savar Model College", detail: "Science — GPA 3.83" },
      { year: "2015", degree: "Secondary School Certificate", institution: "Savar Cantonment Board Boys High School", detail: "Science — GPA 4.29" },
    ];
    const certifications = [
      { title: "Cyber Security Certificate", issuer: "Google.org" },
      { title: "SAP Business Technology Platform (BTP)", issuer: "SAP Sapphire" },
    ];
    return {
      content: [{ type: "text", text: JSON.stringify({ education, certifications }, null, 2) }],
      structuredContent: { education, certifications },
    };
  },
});
