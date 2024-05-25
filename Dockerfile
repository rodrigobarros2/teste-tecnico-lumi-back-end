FROM node:latest

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

RUN npx prisma migrate deploy

EXPOSE 3000

# Command to run your application
CMD ["npm", "start"]
