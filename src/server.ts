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
    const data = await pdfParse(dataBuffer);
    console.log("🚀 ~ app.post ~ data:", data);
    // Supondo que o PDF contenha informações como nome e email
    const extractedData = {
      name: "Nome extraído do PDFdaaaa", // Substitua pelo dado correto extraído do PDF
      email: "email@extraido.commaaaa", // Substitua pelo dado correto extraído do PDF
    };

    // Exemplo de salvar no banco de dados
    const user = await prisma.user.create({
      data: extractedData,
    });

    res.send(data);
  } catch (err) {
    res.status(500).send(err.toString());
  }
});

app.listen(3333, () => {
  console.log("Server started on http://localhost:3000");
});
