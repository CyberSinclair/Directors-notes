import { expect, test } from "@playwright/test";
import { gridCards, programmeLine } from "./helpers";

const legalNav = (page) => page.getByRole("navigation", { name: "Legal" });

test("footer links open the policy pages and back works", async ({ page }) => {
  await page.goto("/");

  await legalNav(page).getByRole("link", { name: "Privacy Policy" }).click();
  await expect(page).toHaveURL(/#\/privacy-policy$/);
  await expect(page.getByRole("heading", { level: 2, name: "Privacy Policy" })).toBeFocused();
  await expect(gridCards(page)).toHaveCount(0);

  await legalNav(page).getByRole("link", { name: "Cookie Policy" }).click();
  await expect(page.getByRole("heading", { level: 2, name: "Cookie Policy" })).toBeVisible();

  // The browser back button returns through the pages.
  await page.goBack();
  await expect(page.getByRole("heading", { level: 2, name: "Privacy Policy" })).toBeVisible();
  await page.goBack();
  await expect(gridCards(page)).toHaveCount(180);
});

test("policy pages open directly from their URL", async ({ page }) => {
  await page.goto("/#/cookie-policy");
  await expect(page.getByRole("heading", { level: 2, name: "Cookie Policy" })).toBeVisible();
  await expect(page.getByRole("table")).toContainText("programmeIds");
});

test("the programme survives a visit to a policy page", async ({ page }) => {
  await page.goto("/");
  await gridCards(page).first().getByRole("button", { name: "Add to programme" }).click();

  await legalNav(page).getByRole("link", { name: "Privacy Policy" }).click();
  await page.getByRole("link", { name: /Back to films/ }).click();

  await expect(programmeLine(page)).toContainText("1 film selected");
});

test("the site sets no cookies, as the Cookie Policy says", async ({ page, context }) => {
  await page.goto("/");
  await gridCards(page).first().getByRole("button", { name: "Add to programme" }).click();
  await page.goto("/#/cookie-policy");

  expect(await context.cookies()).toEqual([]);
  const storedKeys = await page.evaluate(() => Object.keys(localStorage));
  expect(storedKeys).toEqual(["programmeIds"]);
});
