const fastify = require('fastify')({ logger: true });
const pdfParse = require('pdf-parse');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const fs = require('fs').promises;

// Middleware CORS
fastify.register(require('fastify-cors'), { 
  origin: true
});

// Rota para upload de PDF e extração de dados
fastify.post('/upload', async (request, reply) => {
  console.log('ola')
  /* const data = await request.file();
  const buffer = await data.toBuffer();

  try {
    const pdfData = await pdfParse(buffer);
    const extractedData = extractDataFromPdf(pdfData.text);

    const invoice = await prisma.invoice.create({
      data: extractedData
    });

    reply.send(invoice);
  } catch (error) {
    fastify.log.error(error);
    reply.status(500).send({ error: 'Failed to process PDF' });
  } */
});

// Função para extrair dados específicos do PDF
function extractDataFromPdf(text) {
  // Implementar a lógica de extração de dados aqui
  // Este é um exemplo fictício
  const dateMatch = text.match(/Data:\s(\d{2}\/\d{2}\/\d{4})/);
  const amountMatch = text.match(/Total:\s\$?(\d+\.\d{2})/);
  const customerMatch = text.match(/Cliente:\s(.+)/);

  return {
    date: new Date(dateMatch[1]),
    amount: parseFloat(amountMatch[1]),
    customer: customerMatch[1].trim()
  };
}

// Iniciar o servidor
const start = async () => {
  try {
    await fastify.listen(3000);
    fastify.log.info(`Server listening on ${fastify.server.address().port}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
start();
