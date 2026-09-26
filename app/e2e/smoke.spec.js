import { expect, test } from "@playwright/test";
import { carouselCards, gridCards } from "./helpers";

test("home page loads without errors", async ({ page }) => {
  const errors = [];
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });

  await page.goto("/");

  await expect(
    page.getByRole("heading", { level: 1, name: "Focal lens Films" }),
  ).toBeVisible();
  await expect(carouselCards(page)).toHaveCount(10);
  await expect(gridCards(page)).toHaveCount(180);
  expect(errors).toEqual([]);
});

test("poster images load", async ({ page }) => {
  const failed = [];
  page.on("response", (response) => {
    if (response.url().includes("/images/") && !response.ok()) {
      failed.push(`${response.status()} ${response.url()}`);
    }
  });

  await page.goto("/");
  await page.waitForLoadState("networkidle");

  const broken = await page.locator("article img").evaluateAll((images) =>
    images
      .filter((img) => img.complete && img.naturalWidth === 0)
      .map((img) => img.getAttribute("src")),
  );
  expect(broken).toEqual([]);
  expect(failed).toEqual([]);
});
