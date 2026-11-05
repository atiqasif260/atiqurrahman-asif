import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { currentExperience, experiences } from "../lib/experience";
import { qmsProjects } from "../lib/qms-projects";

// The ask-ai edge function answers visitor questions from a server-side copy
// of the portfolio knowledge (Edge Functions cannot import from src/). This
// test keeps that copy in sync with the shared data modules so employment
// dates, role titles and the QMS caveat can never silently drift apart.
const knowledge = readFileSync(
  resolve(__dirname, "../../supabase/functions/_shared/portfolio-knowledge.ts"),
  "utf-8",
);

describe("ask-ai portfolio knowledge sync", () => {
  it("contains the current role, company and group", () => {
    expect(currentExperience).toBeDefined();
    expect(knowledge).toContain(currentExperience!.title);
    expect(knowledge).toContain(currentExperience!.company);
    expect(knowledge).toContain(currentExperience!.group!);
    expect(knowledge).toContain("09/2026");
  });

  it("matches every past employer and period", () => {
    for (const exp of experiences.filter((e) => e.endDate !== null)) {
      expect(knowledge).toContain(exp.company);
      expect(knowledge).toContain(exp.period);
    }
  });

  it("marks the QMS focus areas as research-based", () => {
    expect(knowledge).toContain("research-based");
    expect(knowledge).toContain("NOT verified personal achievements");
  });

  it("contains every QMS project title and the approval caveat", () => {
    for (const project of qmsProjects) {
      expect(knowledge).toContain(project.title);
      expect(knowledge).toContain(project.organization);
    }
    expect(knowledge).toContain("subject to company review and approval");
  });
});
