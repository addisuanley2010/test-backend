FROM node:alpine

RUN npm install nodemon -g

WORKDIR /app

COPY ./package.json .

COPY ./package-lock.json .

RUN npm install

COPY ./src ./src

COPY ./.env .
EXPOSE 3001
CMD ["npm", "start"]


