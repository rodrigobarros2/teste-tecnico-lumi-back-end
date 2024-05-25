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

RUN npx prisma migrate deploy

RUN npm run build

# Expõe a porta que a aplicação irá rodar
EXPOSE 3333

# Comando para iniciar a aplicação
CMD ["npm", "run", "start"]
