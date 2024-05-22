import express from "express";
import multer from "multer";
import pdfParse from "pdf-parse";
import { PrismaClient } from "@prisma/client";

const app = express();
const upload = multer({ storage: multer.memoryStorage() });
const prisma = new PrismaClient();

app.post("/upload", upload.single("file"), async (req, res) => {
  if (!req.file) {
    return res.status(400).send("No file uploaded.");
  }

  const dataBuffer = req.file.buffer;

  try {
    const allInformationTicket = await pdfParse(dataBuffer);
    const ticketText = allInformationTicket.text.split("\n").filter((v) => v.trim());

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

    const user = await prisma.user.create({
      data: extractedData,
    });

    res.send(user);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.get("/user", async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (error) {
    console.error("Erro ao buscar usuários:", error);
    res.status(500).json({ error: "Erro ao buscar usuários" });
  }
});

app.listen(3333, () => {
  console.log("Server started on http://localhost:3000");
});
