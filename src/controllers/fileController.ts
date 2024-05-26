import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const uploadPdf = async (req: Request, res: Response) => {
  if (!req.file) {
    return res.status(400).send("No file uploaded.");
  }

  try {
    const { originalname, path: filePath } = req.file;
    const { id } = req.params;

    const document = await prisma.document.create({
      data: {
        fileName: originalname,
        filePath: filePath,
        userId: id,
      },
    });

    res.status(200).json({ document });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao fazer upload do arquivo." });
  }
};

export const downloadFile = async (req: Request, res: Response) => {
  const fileId = req.params.id;

  try {
    const fileRecord = await prisma.document.findUnique({
      where: { id: fileId },
    });

    if (!fileRecord) {
      return res.status(404).send("Arquivo não encontrado.");
    }

    res.download(fileRecord.filePath, fileRecord.fileName, (err) => {
      if (err) {
        console.error("Erro ao fazer o download do arquivo:", err);
        res.status(500).send("Erro ao fazer o download do arquivo");
      }
    });
  } catch (error) {
    console.error("Erro ao consultar o banco de dados:", error);
    res.status(500).send("Erro ao consultar o banco de dados.");
  }
};
