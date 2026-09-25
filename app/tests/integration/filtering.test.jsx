import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { awards } from "../../src/data/awards";
import { films } from "../../src/data/films";
import { awardLegend, cardsIn, gridSection, renderApp, shownLine, titleOf } from "../helpers";

const categoryButton = (award) =>
  awardLegend().getByRole("button", { name: award.description.trim() });

describe("Filtering the film grid", () => {
  it("shows every film with its count and runtime by default", () => {
    renderApp();

    expect(cardsIn(gridSection())).toHaveLength(films.length);
    expect(shownLine()).toHaveTextContent(
      "180 films shown · Combined runtime: 36 hr 55 min",
    );
  });

  it("filters by award status and back to all", async () => {
    const user = userEvent.setup();
    renderApp();

    await user.click(awardLegend().getByRole("button", { name: /Award Winners/ }));
    expect(cardsIn(gridSection())).toHaveLength(106);
    expect(shownLine()).toHaveTextContent(/^106 films shown/);

    await user.click(awardLegend().getByRole("button", { name: /Award Nominees/ }));
    expect(cardsIn(gridSection())).toHaveLength(90);

    await user.click(awardLegend().getByRole("button", { name: "All Films" }));
    expect(cardsIn(gridSection())).toHaveLength(films.length);
  });

  it("toggles categories on and off and combines several", async () => {
    const user = userEvent.setup();
    renderApp();
    const [first, second] = awards;

    await user.click(categoryButton(first));
    expect(categoryButton(first)).toHaveAttribute("aria-pressed", "true");
    expect(cardsIn(gridSection())).toHaveLength(15);

    await user.click(categoryButton(second));
    expect(cardsIn(gridSection())).toHaveLength(30);

    await user.click(categoryButton(first));
    expect(categoryButton(first)).toHaveAttribute("aria-pressed", "false");
    expect(cardsIn(gridSection())).toHaveLength(15);
  });

  it("combines award status with categories", async () => {
    const user = userEvent.setup();
    renderApp();

    await user.click(awardLegend().getByRole("button", { name: /Award Winners/ }));
    await user.click(categoryButton(awards[0]));
    await user.click(categoryButton(awards[1]));

    expect(cardsIn(gridSection())).toHaveLength(10);
  });

  it("clears all selected categories", async () => {
    const user = userEvent.setup();
    renderApp();

    expect(awardLegend().queryByRole("button", { name: /Clear category/ })).toBeNull();

    await user.click(categoryButton(awards[0]));
    await user.click(categoryButton(awards[1]));
    await user.click(awardLegend().getByRole("button", { name: /Clear category/ }));

    expect(cardsIn(gridSection())).toHaveLength(films.length);
    expect(awardLegend().queryByRole("button", { name: /Clear category/ })).toBeNull();
    for (const award of awards) {
      expect(categoryButton(award)).toHaveAttribute("aria-pressed", "false");
    }
  });

  it("only shows films that match the selected category", async () => {
    const user = userEvent.setup();
    renderApp();
    const award = awards[5];

    await user.click(categoryButton(award));

    const expectedTitles = films
      .filter((film) => film.honours.some((h) => h.bodyId === award.id))
      .map((film) => film.title);
    const shownTitles = cardsIn(gridSection()).map(titleOf);

    expect(shownTitles).toEqual(expectedTitles);
  });
});
