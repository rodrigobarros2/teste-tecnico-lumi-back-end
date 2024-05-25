FROM node:latest

WORKDIR /app

COPY package*.json ./

RUN npm ci

RUN npm run build

RUN npx prisma migrate deploy

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
