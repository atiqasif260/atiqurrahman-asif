import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

// The CV analytics must stay aggregate-only: one total plus one row per day,
// never per-visitor records (IP, user agent, visitor IDs, per-event timestamps).

const migration = readFileSync("drizzle/migrations/0001_cv_download_daily.sql", "utf8");

describe("cv analytics privacy", () => {
  it("daily table stores only a date and a count", () => {
    expect(migration).toMatch(/CREATE TABLE public\.cv_download_daily \(\s*day date PRIMARY KEY,\s*download_count bigint NOT NULL DEFAULT 0\s*\);/);
  });

  it("adds no per-visitor columns", () => {
    for (const forbidden of ["ip", "user_agent", "visitor", "session", "fingerprint", "device"]) {
      expect(migration.toLowerCase()).not.toContain(forbidden);
    }
  });

  it("keeps daily reads restricted to authenticated users", () => {
    expect(migration).toMatch(/GRANT SELECT ON public\.cv_download_daily TO authenticated;/);
    expect(migration).not.toMatch(/GRANT .* ON public\.cv_download_daily TO anon/);
    expect(migration).toMatch(/ENABLE ROW LEVEL SECURITY/);
  });
});
