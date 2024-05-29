import { extractNumber } from "../extractNumber";

describe("extractNumber", () => {
  it("should extract numbers from a string containing digits and commas", () => {
    expect(extractNumber("abc123,456def")).toBe("123,456");
    expect(extractNumber("1,234,567")).toBe("1,234,567");
  });

  it("should return an empty string if no numbers are found in the string", () => {
    expect(extractNumber("abcdef")).toBe("");
    expect(extractNumber("")).toBe("");
  });
});
