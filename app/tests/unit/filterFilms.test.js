// @vitest-environment node
import { describe, expect, it } from "vitest";
import { filterFilms } from "../../src/utils/filterFilms";

const awards = [
  { id: "award-a", name: "Award A" },
  { id: "award-b", name: "Award B" },
  { id: "award-c", name: "Award C" },
];

const honour = (bodyId, result, bodyType = "Award") => ({ bodyId, result, bodyType });

const films = [
  { id: "wins-a", honours: [honour("award-a", "Winner")] },
  { id: "nominated-b", honours: [honour("award-b", "Nominated")] },
  { id: "shortlisted-c", honours: [honour("award-c", "Shortlisted")] },
  {
    id: "festival-winner",
    honours: [honour("festival-1", "Winner", "Festival")],
  },
  { id: "no-honours", honours: [] },
  { id: "missing-honours" },
];

const ids = (list) => list.map((film) => film.id);

describe("filterFilms", () => {
  it("returns every film when no filters are active", () => {
    expect(filterFilms(films, awards, "all", [])).toBe(films);
  });

  it("keeps films with any Winner honour for the winner filter", () => {
    expect(ids(filterFilms(films, awards, "winner", []))).toEqual([
      "wins-a",
      "festival-winner",
    ]);
  });

  it("keeps films with any Nominated honour for the nominated filter", () => {
    expect(ids(filterFilms(films, awards, "nominated", []))).toEqual([
      "nominated-b",
    ]);
  });

  it("matches a category by award name via the award id", () => {
    expect(ids(filterFilms(films, awards, "all", ["Award C"]))).toEqual([
      "shortlisted-c",
    ]);
  });

  it("shows films from any of several selected categories", () => {
    expect(
      ids(filterFilms(films, awards, "all", ["Award A", "Award B"])),
    ).toEqual(["wins-a", "nominated-b"]);
  });

  it("requires status and category to match on the same honour", () => {
    const film = {
      id: "mixed",
      honours: [
        honour("award-a", "Nominated"),
        honour("award-b", "Winner"),
      ],
    };

    expect(filterFilms([film], awards, "winner", ["Award A"])).toEqual([]);
    expect(filterFilms([film], awards, "winner", ["Award B"])).toEqual([film]);
  });

  it("returns no films for an unknown category", () => {
    expect(filterFilms(films, awards, "all", ["Not an award"])).toEqual([]);
  });

  it("treats an unknown status as 'all'", () => {
    expect(filterFilms(films, awards, "something-else", [])).toBe(films);
  });

  it("does not modify the input list", () => {
    const copy = [...films];
    filterFilms(films, awards, "winner", ["Award A"]);
    expect(films).toEqual(copy);
  });
});
