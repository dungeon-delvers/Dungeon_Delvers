FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

COPY tsconfig.json ./

COPY ./.env ./ 

COPY src ./src

RUN npm install

EXPOSE 3000

USER node

CMD ["npm", "run", "start"]