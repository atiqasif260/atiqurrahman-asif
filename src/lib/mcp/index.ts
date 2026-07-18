import { auth, defineMcp } from "@lovable.dev/mcp-js";
import getProfileTool from "./tools/get-profile";
import listExperienceTool from "./tools/list-experience";
import listEducationTool from "./tools/list-education";
import sendMessageTool from "./tools/send-message";

const projectRef = import.meta.env.VITE_SUPABASE_PROJECT_ID ?? "project-ref-unset";

export default defineMcp({
  name: "atiq-portfolio-mcp",
  title: "Atiq Portfolio MCP",
  version: "0.1.0",
  instructions:
    "Tools for Atiqur Rahman Asif's portfolio. Use get_profile, list_experience, and list_education to answer questions about Atiq. Use send_message to relay a note from the signed-in user.",
  auth: auth.oauth.issuer({
    issuer: `https://${projectRef}.supabase.co/auth/v1`,
    acceptedAudiences: "authenticated",
  }),
  tools: [getProfileTool, listExperienceTool, listEducationTool, sendMessageTool],
});
