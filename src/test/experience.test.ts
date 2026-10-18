import { describe, expect, it } from "vitest";
import { currentExperience, experiences } from "@/lib/experience";

describe("professional employment history", () => {
  it("records A ONE POLAR LIMITED as the sole current employer", () => {
    expect(experiences.filter((experience) => experience.endDate === null)).toHaveLength(1);
    expect(currentExperience?.company).toBe("A ONE POLAR LIMITED");
    expect(currentExperience?.group).toBe("A Concern of Micro Fibre Group");
    expect(currentExperience?.title).toBe("Junior Executive, QMS Department");
  });

  it("records the QMS role starting on 10 September 2026", () => {
    expect(currentExperience?.startDate).toBe("2026-09-10");
    expect(currentExperience?.endDate).toBeNull();
  });

  it("records Ztrios as a former employer using the requested April 2023–August 2026 period", () => {
    const ztrios = experiences.find((experience) => experience.company === "Ztrios Technologies LTD");
    expect(ztrios?.startDate).toBe("2023-04");
    expect(ztrios?.endDate).toBe("2026-08");
  });
});