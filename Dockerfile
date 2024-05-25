# Use a imagem base node 18-alpine
FROM node:18-alpine

# Define o diretório de trabalho dentro do container
WORKDIR /app

# Copia os arquivos de dependências
COPY package.json ./
COPY package-lock.json ./

# Instala as dependências do projeto
RUN npm install

# Copia o restante do código da aplicação
COPY . .

# Gera o código do Prisma

RUN npm run build

RUN npx prisma migrate dev

RUN npx prisma generate

# Expõe a porta que a aplicação irá rodar
EXPOSE 3333

# Comando para iniciar a aplicação
CMD ["npm", "run", "start"]
