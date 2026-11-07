import { describe, expect, it } from "vitest";
import { guideSchema } from "./schema";

const validGuide = {
  slug: "berlin-test-guide",
  city: "berlin",
  title: { en: "Title", de: "Titel" },
  summary: { en: "Summary", de: "Zusammenfassung" },
  officialSourceUrl: "https://www.berlin.de",
  lastChecked: "2026-10-30",
  cost: { en: "Free", de: "Kostenlos" },
  timeline: { en: "Soon", de: "Bald" },
  whereToGo: { en: "Bürgeramt", de: "Bürgeramt" },
  requiredDocuments: [{ en: "ID", de: "Ausweis" }],
  steps: [
    {
      id: "step-1",
      title: { en: "Step", de: "Schritt" },
      description: { en: "Do a thing", de: "Mache etwas" },
    },
  ],
};

describe("guideSchema", () => {
  it("accepts valid guide content", () => {
    expect(guideSchema.safeParse(validGuide).success).toBe(true);
  });

  it("rejects a slug that isn't kebab-case", () => {
    const result = guideSchema.safeParse({
      ...validGuide,
      slug: "Not Kebab Case",
    });

    expect(result.success).toBe(false);
  });

  it("rejects a missing translation", () => {
    const result = guideSchema.safeParse({
      ...validGuide,
      title: { en: "Title only" },
    });

    expect(result.success).toBe(false);
  });

  it("rejects an invalid officialSourceUrl", () => {
    const result = guideSchema.safeParse({
      ...validGuide,
      officialSourceUrl: "not-a-url",
    });

    expect(result.success).toBe(false);
  });

  it("rejects a guide with no steps", () => {
    const result = guideSchema.safeParse({ ...validGuide, steps: [] });

    expect(result.success).toBe(false);
  });
});
