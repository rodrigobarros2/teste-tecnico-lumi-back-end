import { isNumber } from "../isNumber";

test("Should return true for a string that can be converted to a number", () => {
  expect(isNumber("123")).toBe(true);
  expect(isNumber("12.34")).toBe(true);
  expect(isNumber("0")).toBe(true);
  expect(isNumber("-123")).toBe(true);
});

test("Should return false for a string that cannot be converted to a number", () => {
  expect(isNumber("abc")).toBe(false);
  expect(isNumber("")).toBe(false);
  expect(isNumber(" ")).toBe(false);
});

test("Should return true for a string that contains comma as a decimal separator", () => {
  expect(isNumber("12,34")).toBe(true);
});
