FROM node:16-alpine

RUN npm install -g ts-node

WORKDIR /app

COPY . .

RUN npm install

EXPOSE 8080

CMD ["npm","start"]