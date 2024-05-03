FROM node:alpine

RUN npm install nodemon -g

WORKDIR /app

COPY ./package.json .

COPY ./package-lock.json .

RUN npm install

COPY ./src ./src

COPY ./.env .

COPY ./config.js .

CMD ["npm", "start"]


