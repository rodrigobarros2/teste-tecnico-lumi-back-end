export const extractDataFromTicket = (ticketText: string[]) => {
  function isNumber(value: string) {
    const normalizedValue = parseFloat(value.replace(",", "."));
    return !isNaN(normalizedValue) && value.trim() !== "";
  }

  function extractNumber(str: string) {
    const match = str.match(/[\d,]+/);
    return match ? match[0] : "";
  }

  const formatData = (index: string[]) =>
    index.filter(isNumber).map((value, index) => {
      const valueInformation = ["quantity", "price", "value", "tariff"];
      const key = valueInformation[index];
      return { [key]: value };
    });

  const extractedData = {
    customerNumber: "",
    referenceMonth: "",
    electricity: [{}],
    injectedEnergy: [{}],
    compensatedEnergy: [{}],
    contributionPublicLighting: "",
  };

  const customerIndex = ticketText.findIndex((item) => item.includes("Nº DO CLIENTE"));
  const referentIndex = ticketText.findIndex((item) => item.includes("Referente a"));
  const electricityIndex = ticketText.findIndex((item) => item.includes("Energia ElétricakWh"));

  extractedData.customerNumber = ticketText[customerIndex + 1].split(/\s+/).slice(1, 2).toString();
  extractedData.referenceMonth = ticketText[referentIndex + 1].split(/\s+/)[1];
  extractedData.electricity = formatData(ticketText[electricityIndex].split(/\s+/));
  extractedData.injectedEnergy = formatData(ticketText[electricityIndex + 1].split(/\s+/));
  extractedData.compensatedEnergy = formatData(ticketText[electricityIndex + 2].split(/\s+/));
  extractedData.contributionPublicLighting = extractNumber(ticketText[electricityIndex + 3].toString());

  return extractedData;
};
