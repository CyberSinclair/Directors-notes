import { expect, test } from "@playwright/test";
import { carouselTrack } from "./helpers";

const scrollLeft = (track) => track.evaluate((el) => Math.round(el.scrollLeft));
const maxScroll = (track) =>
  track.evaluate((el) => Math.round(el.scrollWidth - el.clientWidth));

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test("next and previous scroll the carousel", async ({ page }) => {
  const track = carouselTrack(page);
  expect(await scrollLeft(track)).toBe(0);

  await page.getByRole("button", { name: "Next films" }).click();
  await expect.poll(() => scrollLeft(track)).toBeGreaterThan(0);

  await page.getByRole("button", { name: "Previous films" }).click();
  await expect.poll(() => scrollLeft(track)).toBe(0);
});

test("wraps around at both ends", async ({ page }) => {
  const track = carouselTrack(page);
  const end = await maxScroll(track);
  expect(end).toBeGreaterThan(0);

  // Previous at the start jumps to the end.
  await page.getByRole("button", { name: "Previous films" }).click();
  await expect.poll(() => scrollLeft(track)).toBe(end);

  // Next at the end jumps back to the start.
  await page.getByRole("button", { name: "Next films" }).click();
  await expect.poll(() => scrollLeft(track)).toBe(0);
});
