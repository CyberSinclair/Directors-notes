import { expect, test } from "@playwright/test";
import { carouselCards, gridCards, programmeLine } from "./helpers";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test("adds films, keeps them after a reload, and removes them", async ({ page }) => {
  await expect(programmeLine(page)).toHaveText(
    "Your programme: 0 films selected · Combined runtime: 0 min",
  );

  const firstGridCard = gridCards(page).first();
  await firstGridCard.getByRole("button", { name: "Add to programme" }).click();
  await carouselCards(page).first().getByRole("button", { name: "Add to programme" }).click();

  await expect(programmeLine(page)).toContainText("2 films selected");
  await expect(firstGridCard).toHaveClass(/film-card--selected/);

  await page.reload();

  await expect(programmeLine(page)).toContainText("2 films selected");
  await gridCards(page)
    .first()
    .getByRole("button", { name: "Remove from programme" })
    .click();
  await expect(programmeLine(page)).toContainText("1 film selected");
});

test("a film added in the carousel shows as added in the grid", async ({ page }) => {
  const carouselCard = carouselCards(page).first();
  const title = await carouselCard.getByRole("heading").textContent();

  await carouselCard.getByRole("button", { name: "Add to programme" }).click();

  const gridCard = gridCards(page).filter({
    has: page.getByRole("heading", { name: title, exact: true }),
  });
  await expect(gridCard.getByRole("button")).toHaveText("Remove from programme");
});
