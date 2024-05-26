FROM node:lts-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npx prisma migrate deploy

RUN npm run build

EXPOSE 5432

ENV DATABASE_URL="postgres://lumini_teste_tecnico_user:8YCIAy64fHaAPJIs6IJgnDDgCDkFgSo3@dpg-cp937a7109ks73a3c9lg-a/lumini_teste_tecnico"

CMD ["npm", "start"]
