FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

COPY tsconfig.json ./

COPY ./.env ./ 

COPY src ./src

RUN npm install

EXPOSE 4000

USER node

CMD ["npm", "run", "start"]