// @vitest-environment node
import { describe, expect, it } from "vitest";
import { getAwardHonours } from "../../src/utils/awardHonours";

const awards = [
  { id: "award-a", name: "Award A" },
  { id: "award-b", name: "Award B" },
];

describe("getAwardHonours", () => {
  it("keeps only award wins and nominations", () => {
    const film = {
      honours: [
        { bodyId: "festival-1", bodyType: "Festival", result: "Winner" },
        { bodyId: "award-a", bodyType: "Award", result: "Shortlisted" },
        { bodyId: "award-b", bodyType: "Award", result: "Nominated" },
      ],
    };

    expect(getAwardHonours(film, awards)).toEqual([
      expect.objectContaining({ bodyId: "award-b", awardName: "Award B" }),
    ]);
  });

  it("lists winners before nominations", () => {
    const film = {
      honours: [
        { bodyId: "award-a", bodyType: "Award", result: "Nominated" },
        { bodyId: "award-b", bodyType: "Award", result: "Winner" },
      ],
    };

    expect(getAwardHonours(film, awards).map((h) => h.result)).toEqual([
      "Winner",
      "Nominated",
    ]);
  });

  it("falls back to the award id when the award is unknown", () => {
    const film = {
      honours: [{ bodyId: "award-z", bodyType: "Award", result: "Winner" }],
    };

    expect(getAwardHonours(film, awards)[0].awardName).toBe("award-z");
  });

  it("returns an empty list for films without honours", () => {
    expect(getAwardHonours({}, awards)).toEqual([]);
  });
});
