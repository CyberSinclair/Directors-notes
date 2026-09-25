import { within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { films } from "../../src/data/films";
import { carouselSection, cardsIn, renderApp, titleOf } from "../helpers";

// Give the (layout-less) jsdom carousel a size and scroll position.
function setScrollState(container, { scrollLeft, scrollWidth = 2000, clientWidth = 800 }) {
  Object.defineProperty(container, "scrollWidth", { value: scrollWidth, configurable: true });
  Object.defineProperty(container, "clientWidth", { value: clientWidth, configurable: true });
  Object.defineProperty(container, "scrollLeft", { value: scrollLeft, configurable: true });
}

function setup() {
  const user = userEvent.setup();
  renderApp();
  const section = carouselSection();
  return {
    user,
    container: section.querySelector(".film-container"),
    next: within(section).getByRole("button", { name: "Next films" }),
    previous: within(section).getByRole("button", { name: "Previous films" }),
  };
}

describe("Latest films carousel", () => {
  it("shows the 10 most recently published films, newest first", () => {
    renderApp();
    const expected = [...films]
      .sort((a, b) => b.published.localeCompare(a.published))
      .slice(0, 10)
      .map((film) => film.title);

    const titles = cardsIn(carouselSection()).map(titleOf);

    expect(titles).toEqual(expected);
  });

  it("scrolls forward and back by one visible page", async () => {
    const { user, container, next, previous } = setup();
    setScrollState(container, { scrollLeft: 400 });

    await user.click(next);
    expect(container.scrollBy).toHaveBeenLastCalledWith({ left: 800, behavior: "smooth" });

    await user.click(previous);
    expect(container.scrollBy).toHaveBeenLastCalledWith({ left: -800, behavior: "smooth" });
  });

  it("wraps to the start when pressing next at the end", async () => {
    const { user, container, next } = setup();
    setScrollState(container, { scrollLeft: 1200 }); // 2000 - 800 = the end

    await user.click(next);

    expect(container.scrollTo).toHaveBeenCalledWith({ left: 0, behavior: "smooth" });
    expect(container.scrollBy).not.toHaveBeenCalled();
  });

  it("wraps to the end when pressing previous at the start", async () => {
    const { user, container, previous } = setup();
    setScrollState(container, { scrollLeft: 0 });

    await user.click(previous);

    expect(container.scrollTo).toHaveBeenCalledWith({ left: 1200, behavior: "smooth" });
  });

  it("renders real film details on carousel cards", () => {
    renderApp();
    const newest = [...films].sort((a, b) => b.published.localeCompare(a.published))[0];
    const card = cardsIn(carouselSection())[0];

    expect(within(card).getByText(newest.synopsis)).toBeInTheDocument();
    expect(within(card).getByRole("img")).toHaveAttribute("src", newest.poster);
    expect(within(card).getByText(`Age rating: ${newest.rating}`)).toBeInTheDocument();
  });
});
