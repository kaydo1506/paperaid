import { describe, expect, it } from "vitest";
import { getGuideBySlug, loadGuides } from "./load-guides";

describe("loadGuides", () => {
  it("loads and validates every guide against the schema", () => {
    const guides = loadGuides();

    expect(guides.length).toBeGreaterThan(0);
  });

  it("has unique slugs", () => {
    const guides = loadGuides();
    const slugs = guides.map((guide) => guide.slug);

    expect(new Set(slugs).size).toBe(slugs.length);
  });
});

describe("getGuideBySlug", () => {
  it("returns the matching guide", () => {
    const guide = getGuideBySlug("berlin-anmeldung");

    expect(guide?.slug).toBe("berlin-anmeldung");
  });

  it("returns undefined for an unknown slug", () => {
    expect(getGuideBySlug("not-a-real-guide")).toBeUndefined();
  });
});
