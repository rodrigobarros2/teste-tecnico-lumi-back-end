export const isNumber = (value: string) => {
  const normalizedValue = parseFloat(value.replace(",", "."));
  return !isNaN(normalizedValue) && value.trim() !== "";
};
