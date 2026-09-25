export const gridCards = (page) =>
  page.locator('section[aria-labelledby="films-heading"] article');

export const carouselCards = (page) =>
  page.locator('section[aria-labelledby="latest-films-heading"] article');

export const carouselTrack = (page) => page.locator(".film-container");

export const awardLegend = (page) => page.locator(".award-legend");

export const programmeLine = (page) => page.getByText(/^Your programme:/);
