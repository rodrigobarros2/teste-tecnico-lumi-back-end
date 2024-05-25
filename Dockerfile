# Usa uma imagem base do Node.js oficial com a versão desejada
FROM node:18-alpine

# Define o diretório de trabalho dentro do container
WORKDIR /app

# Copia o package.json e o package-lock.json para o diretório de trabalho
COPY package*.json ./

# Instala as dependências do projeto
RUN npm install

RUN npm run build


# Copia o restante dos arquivos da aplicação para o diretório de trabalho
COPY . .

# Expõe a porta em que a aplicação será executada (assumindo que a aplicação use a porta 3000)
EXPOSE 3333

# Define o comando para iniciar a aplicação
CMD ["npm", "dist/server.js"]


