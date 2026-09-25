import { screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { films } from "../../src/data/films";
import { totalRuntimeMinutes } from "../../src/utils/formatRuntime";
import {
  carouselSection,
  cardsIn,
  gridSection,
  programmeLine,
  renderApp,
  titleOf,
} from "../helpers";

const cardFor = (section, title) =>
  cardsIn(section).find((card) => titleOf(card) === title);

describe("Building a programme", () => {
  it("starts empty", () => {
    renderApp();
    expect(programmeLine()).toHaveTextContent(
      "Your programme: 0 films selected · Combined runtime: 0 min",
    );
  });

  it("adds and removes a film from the grid", async () => {
    const user = userEvent.setup();
    renderApp();
    const film = films[0];
    const card = cardFor(gridSection(), film.title);

    await user.click(within(card).getByRole("button", { name: "Add to programme" }));

    expect(programmeLine()).toHaveTextContent(
      `Your programme: 1 film selected · Combined runtime: ${totalRuntimeMinutes([film])} min`,
    );
    expect(card).toHaveClass("film-card--selected");

    await user.click(within(card).getByRole("button", { name: "Remove from programme" }));

    expect(programmeLine()).toHaveTextContent("0 films selected");
    expect(card).not.toHaveClass("film-card--selected");
  });

  it("shares the programme between the carousel and the grid", async () => {
    const user = userEvent.setup();
    renderApp();
    const carouselCard = cardsIn(carouselSection())[0];
    const title = titleOf(carouselCard);

    await user.click(within(carouselCard).getByRole("button"));

    const gridCard = cardFor(gridSection(), title);
    expect(gridCard).toHaveClass("film-card--selected");
    expect(within(gridCard).getByRole("button")).toHaveTextContent(
      "Remove from programme",
    );
  });

  it("saves the programme to localStorage", async () => {
    const user = userEvent.setup();
    renderApp();

    await user.click(
      within(cardFor(gridSection(), films[0].title)).getByRole("button"),
    );

    expect(JSON.parse(localStorage.getItem("programmeIds"))).toEqual([
      films[0].id,
    ]);
  });

  it("restores a saved programme on load", () => {
    localStorage.setItem("programmeIds", JSON.stringify([films[0].id, films[1].id]));
    renderApp();

    expect(programmeLine()).toHaveTextContent(
      `2 films selected · Combined runtime: ${totalRuntimeMinutes([films[0], films[1]])} min`,
    );
  });

  it("ignores corrupt saved data", () => {
    localStorage.setItem("programmeIds", "{not json");
    renderApp();
    expect(programmeLine()).toHaveTextContent("0 films selected");
  });

  it("shows the target message only when the programme is 30–45 minutes", () => {
    // Take films in order until the programme reaches at least 30 minutes.
    const programme = [];
    for (const film of films.filter((f) => f.runtimeSeconds)) {
      if (totalRuntimeMinutes(programme) >= 30) break;
      programme.push(film);
    }
    expect(totalRuntimeMinutes(programme)).toBeLessThanOrEqual(45);

    localStorage.setItem("programmeIds", JSON.stringify(programme.map((f) => f.id)));
    renderApp();

    expect(
      screen.getByText("The combined runtime fits the 30–45 minute target."),
    ).toBeInTheDocument();
  });

  it("hides the target message for an empty programme", () => {
    renderApp();
    expect(screen.queryByText(/30–45 minute target/)).toBeNull();
  });
});
