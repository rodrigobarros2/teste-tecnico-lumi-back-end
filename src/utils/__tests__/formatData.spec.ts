import { formatData } from "../formatData";

describe("formatData", () => {
  it('should return an array of objects with keys "quantity", "price", "value", "tariff"', () => {
    const input = ["Energia", "ElétricakWh", "50", "0,95954601", "47,96", "0,74906000", ""];
    const expectedOutput = [{ quantity: "50" }, { price: "0,95954601" }, { value: "47,96" }, { tariff: "0,74906000" }];
    expect(formatData(input)).toEqual(expectedOutput);
  });
});
