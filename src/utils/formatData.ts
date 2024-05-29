import { isNumber } from "./isNumber";

export const formatData = (index: string[]) =>
  index?.filter(isNumber).map((value, index) => {
    const valueInformation = ["quantity", "price", "value", "tariff"];
    const key = valueInformation[index];

    return { [key]: value };
  });
