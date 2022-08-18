FROM node:lts-alpine3.16

RUN mkdir /app

WORKDIR /app

COPY package.json /app

# if local npm registry cache is used (set the registry url properly)
# RUN npm set registry http://172.17.0.1:4873/

RUN npm install

COPY . /app

EXPOSE 3000

CMD ["npm", "start"]
