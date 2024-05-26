import pdfParse from "pdf-parse";

export const parsePdf = async (dataBuffer: Buffer) => {
  const data = await pdfParse(dataBuffer);
  return data.text.split("\n").filter((v) => v.trim());
};
