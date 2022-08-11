FROM node:lts-alpine3.16

RUN mkdir /app

WORKDIR /app

COPY package.json /app

RUN npm install

COPY . /app

EXPOSE 3000

CMD ["npm", "start"]