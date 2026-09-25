import { render, screen, within } from "@testing-library/react";
import App from "../src/App.jsx";

// The full app renders ~190 film cards. Role queries (getByRole) are slow on a
// DOM that size, so these helpers find the big containers with CSS selectors
// and only use role queries inside a small container.

export function renderApp() {
  return render(<App />);
}

// The "Chosen films" grid section.
export function gridSection() {
  return document.querySelector('section[aria-labelledby="films-heading"]');
}

// The "Latest Films" carousel section.
export function carouselSection() {
  return document.querySelector('section[aria-labelledby="latest-films-heading"]');
}

// The award filter buttons.
export function awardLegend() {
  return within(document.querySelector(".award-legend"));
}

export function cardsIn(section) {
  return [...section.querySelectorAll("article")];
}

export function titleOf(card) {
  return card.querySelector("h3").textContent;
}

export function programmeLine() {
  return screen.getByText(/^Your programme:/);
}

export function shownLine() {
  return screen.getByText(/films? shown/);
}
