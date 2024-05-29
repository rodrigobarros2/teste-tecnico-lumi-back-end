import { extractDataFromTicket } from "../pdfUtils";

describe("Testes da função extractDataFromTicket", () => {
  it("Deve retornar os dados corretos para um ticket válido", () => {
    const ticketText = [
      "Energia ElétricakWh      50  0,95214489        47,59 0,74906000 ",
      "Energia SCEE s/ ICMSkWh     627  0,50795289       318,47 0,48733000 ",
      "Energia compensada GD IkWh     627  0,48733000      -305,55 0,48733000 ",
      "Contrib Ilum Publica Municipal         49,43",
      "        Nº DO CLIENTE                      Nº DA INSTALAÇÃO",
      "  7005400387        3000055479",
      "Referente a Vencimento Valor a pagar (R$)",
      "    DEZ/2023               09/01/2024               109,94 ",
    ];

    const expectedData = {
      customerNumber: "7005400387",
      referenceMonth: "DEZ/2023",
      electricity: [{ quantity: "50" }, { price: "0,95214489" }, { value: "47,59" }, { tariff: "0,74906000" }],
      injectedEnergy: [{ quantity: "627" }, { price: "0,50795289" }, { value: "318,47" }, { tariff: "0,48733000" }],
      compensatedEnergy: [{ quantity: "627" }, { price: "0,48733000" }, { value: "-305,55" }, { tariff: "0,48733000" }],
      contributionPublicLighting: "49,43",
    };
    expect(extractDataFromTicket(ticketText)).toEqual(expectedData);
  });
});
