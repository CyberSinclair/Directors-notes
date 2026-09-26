import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach, vi } from "vitest";

// Pure-logic tests opt into the plain Node environment, which has no DOM.
const hasDom = typeof window !== "undefined";

if (hasDom) {
  // jsdom does no layout, so element scrolling is missing; stub it so the
  // carousel can be tested by asserting on the calls.
  Element.prototype.scrollBy = vi.fn();
  Element.prototype.scrollTo = vi.fn();
  window.scrollTo = vi.fn();
}

afterEach(() => {
  if (hasDom) {
    cleanup();
    localStorage.clear();
    // Tests that open a policy page change the URL hash; start each test on the home page.
    history.replaceState(null, "", "/");
  }
  vi.clearAllMocks();
});
