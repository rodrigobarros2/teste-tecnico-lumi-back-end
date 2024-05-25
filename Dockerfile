FROM node:lts-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm i

RUN npm run build

RUN npx prisma migrate deploy

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
