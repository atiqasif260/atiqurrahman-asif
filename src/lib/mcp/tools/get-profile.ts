import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";

export default defineTool({
  name: "get_profile",
  title: "Get profile",
  description: "Return Atiqur Rahman Asif's professional profile summary, contact info, and skills.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => {
    const profile = {
      name: "Atiqur Rahman Asif",
      roles: ["IT Professional", "Marketing Strategist"],
      location: "Savar, Dhaka-1344, Bangladesh",
      email: "atiq.asif260@gmail.com",
      phone: "+880 1999 443965",
      website: "https://atiqurrahman-asif.lovable.app",
      socials: {
        linkedin: "https://www.linkedin.com/in/atiqurrahman-asif/",
        github: "https://github.com/atiqasif260",
        instagram: "https://www.instagram.com/atiq.asif260/",
      },
      skills: {
        technical: ["System Administration", "Networking (LAN/WAN)", "Server Management", "Security Protocols", "SAP BTP"],
        professional: ["Strategic Planning", "Project Management", "Vendor Management", "Budgeting"],
      },
    };
    void z; // schema unused; kept for consistency
    return {
      content: [{ type: "text", text: JSON.stringify(profile, null, 2) }],
      structuredContent: profile,
    };
  },
});
