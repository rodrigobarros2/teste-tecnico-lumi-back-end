FROM node:lts-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm i

COPY . .

RUN npx prisma migrate deploy

COPY prisma ./

RUN npm run build

COPY dist ./

EXPOSE 3000

CMD ["npm", "start"]
