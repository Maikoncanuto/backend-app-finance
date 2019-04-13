FROM node:alpine

WORKDIR /usr/app

ADD .env /usr/app

COPY package*.json ./
RUN npm i 

COPY . .

EXPOSE ${PORT}

CMD ["npm", "run", "start:dev"]
