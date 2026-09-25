import { expect, test } from "@playwright/test";
import { awardLegend, gridCards } from "./helpers";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test("filters the grid by award status", async ({ page }) => {
  const legend = awardLegend(page);

  await legend.getByRole("button", { name: /Award Winners/ }).click();
  await expect(gridCards(page)).toHaveCount(106);
  await expect(page.getByText(/^106 films shown/)).toBeVisible();

  await legend.getByRole("button", { name: /Award Nominees/ }).click();
  await expect(gridCards(page)).toHaveCount(90);

  await legend.getByRole("button", { name: "All Films" }).click();
  await expect(gridCards(page)).toHaveCount(180);
});

test("selects several categories and clears them", async ({ page }) => {
  const legend = awardLegend(page);
  const emerging = legend.getByRole("button", { name: "Emerging talents." });
  const craft = legend.getByRole("button", { name: "Excellence in Craft." });

  await emerging.click();
  await expect(emerging).toHaveAttribute("aria-pressed", "true");
  await expect(gridCards(page)).toHaveCount(15);

  await craft.click();
  await expect(gridCards(page)).toHaveCount(30);

  await legend.getByRole("button", { name: /Clear category/ }).click();
  await expect(gridCards(page)).toHaveCount(180);
  await expect(emerging).toHaveAttribute("aria-pressed", "false");
  await expect(legend.getByRole("button", { name: /Clear category/ })).toHaveCount(0);
});
