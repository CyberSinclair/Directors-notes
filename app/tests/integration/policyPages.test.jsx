import { screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { films } from "../../src/data/films";
import { site } from "../../src/data/site";
import { PROGRAMME_STORAGE_KEY } from "../../src/utils/programmeStorage";
import { cardsIn, gridSection, programmeLine, renderApp } from "../helpers";

const footerLinks = () =>
  within(screen.getByRole("navigation", { name: "Legal" })).getAllByRole("link");

const policyHeading = (name) => screen.findByRole("heading", { level: 2, name });

describe("Policy pages", () => {
  it("links to the privacy and cookie policies from the footer", () => {
    renderApp();

    expect(footerLinks().map((link) => [link.textContent, link.getAttribute("href")])).toEqual([
      ["Privacy Policy", "#/privacy-policy"],
      ["Cookie Policy", "#/cookie-policy"],
    ]);
  });

  it.each([
    ["Privacy Policy", "UK data protection law"],
    ["Cookie Policy", "does not set any cookies"],
  ])("opens the %s from the footer in place of the films", async (name, text) => {
    const user = userEvent.setup();
    renderApp();

    await user.click(screen.getByRole("link", { name }));

    expect(await policyHeading(name)).toHaveFocus();
    expect(screen.getByText(new RegExp(text))).toBeInTheDocument();
    expect(gridSection()).toBeNull();
    // Header and footer stay on every page.
    expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
    expect(screen.getByRole("navigation", { name: "Legal" })).toBeInTheDocument();
  });

  it("opens a policy directly from its URL", async () => {
    history.replaceState(null, "", "/#/cookie-policy");
    renderApp();

    expect(await policyHeading("Cookie Policy")).toBeInTheDocument();
  });

  it("returns to the films and keeps the programme", async () => {
    const user = userEvent.setup();
    renderApp();
    await user.click(within(cardsIn(gridSection())[0]).getByRole("button"));

    await user.click(screen.getByRole("link", { name: "Privacy Policy" }));
    await policyHeading("Privacy Policy");
    await user.click(screen.getByRole("link", { name: /Back to films/ }));

    expect(await screen.findByRole("heading", { name: "Chosen films" })).toBeInTheDocument();
    expect(cardsIn(gridSection())).toHaveLength(films.length);
    expect(programmeLine()).toHaveTextContent("1 film selected");
  });

  it("links between the two policies", async () => {
    const user = userEvent.setup();
    history.replaceState(null, "", "/#/privacy-policy");
    renderApp();
    await policyHeading("Privacy Policy");

    await user.click(
      within(screen.getByRole("article")).getByRole("link", { name: "Cookie Policy" }),
    );

    expect(await policyHeading("Cookie Policy")).toBeInTheDocument();
  });

  it("lists the storage key the app really uses", async () => {
    history.replaceState(null, "", "/#/cookie-policy");
    renderApp();
    await policyHeading("Cookie Policy");

    const table = screen.getByRole("table", { name: /stores on your device/ });
    expect(within(table).getByText(PROGRAMME_STORAGE_KEY)).toBeInTheDocument();
    // One row: the site stores nothing else.
    expect(within(table).getAllByRole("row")).toHaveLength(2);
  });

  it("gives the privacy contact address", async () => {
    history.replaceState(null, "", "/#/privacy-policy");
    renderApp();
    await policyHeading("Privacy Policy");

    const contactLinks = screen.getAllByRole("link", { name: site.contactEmail });
    expect(contactLinks[0]).toHaveAttribute("href", `mailto:${site.contactEmail}`);
  });

  it("shows the home page for an unknown page", () => {
    history.replaceState(null, "", "/#/no-such-page");
    renderApp();

    expect(gridSection()).not.toBeNull();
  });
});
