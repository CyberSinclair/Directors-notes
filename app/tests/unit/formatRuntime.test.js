// @vitest-environment node
import { describe, expect, it } from "vitest";
import {
  formatRuntime,
  totalRuntimeMinutes,
} from "../../src/utils/formatRuntime";

describe("totalRuntimeMinutes", () => {
  it("returns 0 for no films", () => {
    expect(totalRuntimeMinutes([])).toBe(0);
  });

  it("adds seconds before rounding down to whole minutes", () => {
    // 90s + 90s = 180s = 3 min (rounding each film first would give 2).
    expect(
      totalRuntimeMinutes([{ runtimeSeconds: 90 }, { runtimeSeconds: 90 }]),
    ).toBe(3);
  });

  it("treats missing or null runtimes as 0", () => {
    expect(
      totalRuntimeMinutes([
        { runtimeSeconds: 600 },
        { runtimeSeconds: null },
        {},
      ]),
    ).toBe(10);
  });
});

describe("formatRuntime", () => {
  it.each([
    [0, "0 min"],
    [45, "45 min"],
    [120, "120 min"],
  ])("shows %i minutes as '%s'", (minutes, expected) => {
    expect(formatRuntime(minutes)).toBe(expected);
  });

  it.each([
    [121, "2 hr 1 min"],
    [150, "2 hr 30 min"],
    [180, "3 hr"],
    [2215, "36 hr 55 min"],
  ])("switches to hours above 120: %i -> '%s'", (minutes, expected) => {
    expect(formatRuntime(minutes)).toBe(expected);
  });
});
