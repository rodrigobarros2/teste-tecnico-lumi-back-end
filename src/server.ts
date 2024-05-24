import express from "express";
import multer from "multer";
import pdfParse from "pdf-parse";
import { PrismaClient } from "@prisma/client";
import cors from "cors";

const app = express();
const upload = multer({ storage: multer.memoryStorage() });
const prisma = new PrismaClient();

app.use(cors());

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
  const { filter } = req.query;

  try {
    if (!filter) {
      const users = await prisma.user.findMany();

      const uniqueCustomerNumbers = users
        .map((item) => item.customerNumber)
        .filter((value, index, self) => self.indexOf(value) === index);

      return res.json(uniqueCustomerNumbers);
    }

    const user = await prisma.user.findMany({
      where: {
        customerNumber: filter.toString(),
      },
      include: { documents: true },
    });

    res.json(user);
  } catch (error) {
    console.error("Erro ao buscar usuário:", error);
    res.status(500).json({ error: "Ocorreu um erro ao buscar o usuário." });
  }
});

const uploadPdf = multer({ dest: "uploads/" });

app.post("/uploadpdf/:id", uploadPdf.single("pdf"), async (req, res) => {
  try {
    const { originalname, path } = req.file!;
    const { id } = req.params;
    console.log("🚀 ~ app.post ~ userId:", id);

    const document = await prisma.document.create({
      data: {
        fileName: originalname,
        filePath: path,
        userId: id,
      },
    });

    res.status(200).json({ document });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao fazer upload do arquivo." });
  }
});

app.listen(3333, () => {
  console.log("Server started on http://localhost:3000");
});
