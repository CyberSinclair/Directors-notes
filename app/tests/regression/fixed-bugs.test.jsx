// Regression tests: each test pins down a bug that was found and fixed, so it
// can't quietly come back. The comment on each test describes the original bug.
import { screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { awards } from "../../src/data/awards";
import { films } from "../../src/data/films";
import {
  awardLegend,
  carouselSection,
  cardsIn,
  gridSection,
  programmeLine,
  renderApp,
  shownLine,
  titleOf,
} from "../helpers";

describe("Regression: fixed bugs", () => {
  // Bug: FilmCollection used films.map() to return each film's honours list
  // instead of films.filter(), so every grid card rendered blank.
  it("grid cards render real films, not blank cards", () => {
    renderApp();

    const titles = cardsIn(gridSection()).map(titleOf);
    expect(titles).toEqual(films.map((film) => film.title));
    expect(titles.every((title) => title.trim() !== "")).toBe(true);
  });

  // Bug: LatestFilms read film.genre / description / image / runtime, which
  // don't exist in the data, so carousel cards showed blanks and fallbacks.
  it("carousel cards use the real data fields", () => {
    renderApp();

    for (const card of cardsIn(carouselSection())) {
      const film = films.find((f) => f.title === titleOf(card));

      expect(card).toHaveTextContent(film.synopsis);
      expect(card).toHaveTextContent(film.genres[0]);
      expect(card).toHaveTextContent(`Director: ${film.directors[0].name}`);
      // Some films deliberately have no poster; the card then omits the image.
      if (film.poster) {
        expect(within(card).getByRole("img")).toHaveAttribute("src", film.poster);
      }
    }
  });

  // Bug: the carousel showed all 180 films instead of the 10 newest.
  it("carousel is limited to 10 films", () => {
    renderApp();
    expect(cardsIn(carouselSection())).toHaveLength(10);
  });

  // Bug: FilmCard ignored its buttonText prop.
  it("carousel buttons use the buttonText label", () => {
    renderApp();
    for (const card of cardsIn(carouselSection())) {
      expect(within(card).getByRole("button")).toHaveTextContent("Add to programme");
    }
  });

  // Bug: badges only ever looked at a film's 4th honour (honours[3]), so
  // awards anywhere else in the list were never shown.
  it("shows award badges wherever the honour is in the list", () => {
    renderApp();
    const film = films.find((f) => {
      const index = f.honours.findIndex(
        (h) => h.bodyType === "Award" && h.result === "Winner",
      );
      return index !== -1 && index !== 3;
    });
    const card = cardsIn(gridSection()).find((c) => titleOf(c) === film.title);

    expect(within(card).getByRole("list", { name: "Awards" })).toHaveTextContent(
      "🏆 Winner",
    );
  });

  // Bug: the count and runtime were props defaulting to 0 that nothing
  // passed in, so they always showed 0.
  it("film count and runtime are not stuck at zero", async () => {
    const user = userEvent.setup();
    renderApp();

    expect(shownLine()).not.toHaveTextContent(/^0 films/);

    await user.click(within(cardsIn(gridSection())[0]).getByRole("button"));
    expect(programmeLine()).toHaveTextContent("1 film selected");
    expect(programmeLine()).not.toHaveTextContent("Combined runtime: 0 min");
  });

  // Bug: "Add to programme" did nothing because no parent passed id,
  // isSelected or onToggleSelect to FilmCard.
  it("Add to programme works from both card lists", async () => {
    const user = userEvent.setup();
    renderApp();

    await user.click(within(cardsIn(carouselSection())[0]).getByRole("button"));
    await user.click(within(cardsIn(gridSection())[0]).getByRole("button"));

    expect(programmeLine()).toHaveTextContent("2 films selected");
  });

  // Bug: clicking a category hid every other category button, with no way back.
  it("category buttons stay visible after one is clicked", async () => {
    const user = userEvent.setup();
    renderApp();
    const button = (award) =>
      awardLegend().getByRole("button", { name: award.description.trim() });

    await user.click(button(awards[0]));

    for (const award of awards) {
      expect(button(award)).toBeInTheDocument();
    }
  });

  // Removed on request: the "Aim for a combined runtime" nag message.
  it("does not show the 'Aim for…' message", () => {
    renderApp();
    expect(screen.queryByText(/Aim for a combined runtime/)).toBeNull();
  });
});
