import { describe, it, expect } from "vitest";

import { getDate, getDateString } from "./date-utils";
import { replaceUnderscores } from "./string-utils";

describe("Utils", () => {
  it("returns correct date object", () => {
    expect(getDate(946770965000)).toStrictEqual({
      month: "01",
      day: "01",
      year: 2000,
    });
  });

  it("returns correct date string", () => {
    expect(getDateString(946770965000)).toEqual("January 1, 2000");
  });

  it("replaces underscores in string", () => {
    expect(replaceUnderscores("HELLO_WORLD")).toEqual("HELLO WORLD");
  });
});
