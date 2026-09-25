// @vitest-environment node
// Regression tests for the film data. Several UI bugs were really data gaps,
// so these guard the data shape the UI depends on.
import { existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { awards } from "../../src/data/awards";
import { films } from "../../src/data/films";
import { filterFilms } from "../../src/utils/filterFilms";

const publicDir = join(dirname(fileURLToPath(import.meta.url)), "../../public");

describe("Regression: film data", () => {
  it("has unique film ids", () => {
    const ids = films.map((film) => film.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("has unique award ids and names", () => {
    expect(new Set(awards.map((a) => a.id)).size).toBe(awards.length);
    expect(new Set(awards.map((a) => a.name)).size).toBe(awards.length);
  });

  // Bug: 135 films had no award honour at all.
  it("gives every film at least one award honour", () => {
    const missing = films.filter(
      (film) => !film.honours.some((h) => h.bodyType === "Award"),
    );
    expect(missing.map((f) => f.id)).toEqual([]);
  });

  // Bug: only 3 of 12 awards were used, and each had a single result, so
  // many category + status combinations (e.g. Animation + Winners) were empty.
  it.each(awards.map((award) => [award.name]))(
    "%s has winners and nominees",
    (name) => {
      expect(filterFilms(films, awards, "winner", [name]).length).toBeGreaterThan(0);
      expect(filterFilms(films, awards, "nominated", [name]).length).toBeGreaterThan(0);
    },
  );

  it("only references awards that exist", () => {
    const awardIds = new Set(awards.map((a) => a.id));
    const unknown = films
      .flatMap((film) => film.honours)
      .filter((h) => h.bodyType === "Award" && !awardIds.has(h.bodyId));
    expect(unknown).toEqual([]);
  });

  // Bug: no film had an age rating, so every card showed "TBC".
  it("gives every film a valid age rating", () => {
    const invalid = films.filter(
      (film) => !["U", "PG", "12A", "15"].includes(film.rating),
    );
    expect(invalid.map((f) => f.id)).toEqual([]);
  });

  it("gives every film the fields the cards display", () => {
    for (const film of films) {
      expect(film).toMatchObject({
        id: expect.any(String),
        title: expect.any(String),
        synopsis: expect.any(String),
        published: expect.stringMatching(/^\d{4}-\d{2}-\d{2}$/),
      });
      expect(Array.isArray(film.honours)).toBe(true);
    }
  });

  // Some films deliberately have no poster (null); any poster that is set
  // must point at a real file, or the card shows a broken image.
  it("only links posters that exist in public/", () => {
    const missing = films
      .filter((film) => film.poster)
      .filter((film) => !existsSync(join(publicDir, film.poster)))
      .map((film) => film.poster);
    expect(missing).toEqual([]);
  });
});
