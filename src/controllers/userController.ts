import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { parsePdf } from "../services/pdfService";
import { extractDataFromTicket } from "../utils/pdfUtils";

const prisma = new PrismaClient();

export const uploadUser = async (req: Request, res: Response) => {
  if (!req.file) {
    return res.status(400).send("No file uploaded.");
  }

  const dataBuffer = req.file.buffer;

  try {
    const ticketText = await parsePdf(dataBuffer);
    const extractedData = extractDataFromTicket(ticketText);

    const existingUser = await prisma.user.findFirst({
      where: {
        referenceMonth: extractedData.referenceMonth,
        customerNumber: extractedData.customerNumber,
      },
    });

    if (existingUser) {
      throw new Error(`Usuário com mês de referência ${extractedData.referenceMonth} já existe`);
    }

    const user = await prisma.user.create({
      data: extractedData,
    });

    res.send(user);
  } catch (error) {
    if (error instanceof Error) {
      res.status(409).json({ error: error.message });
    } else {
      res.status(500).json({ error: "An unexpected error occurred" });
    }
  }
};

export const getUser = async (req: Request, res: Response) => {
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
};
