FROM node:lts-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm i

COPY . .

RUN npx prisma migrate deploy

COPY prisma /usr/src/app

RUN npm run build

COPY dist /usr/src/app

EXPOSE 3000

CMD ["npm", "start"]
