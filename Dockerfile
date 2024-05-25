FROM node:latest

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

COPY . .

RUN npx prisma migrate deploy

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
