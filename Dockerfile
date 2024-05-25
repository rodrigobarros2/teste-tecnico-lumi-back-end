FROM node:lts-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm i

COPY . .

RUN npm run build

COPY . .

RUN npx prisma migrate deploy

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
