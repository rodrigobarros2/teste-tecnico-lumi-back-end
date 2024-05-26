FROM node:lts-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npx prisma migrate deploy

RUN npm run build

EXPOSE 5432

CMD ["npm", "start"]
