FROM node:18

WORKDIR /usr/src/app

COPY . .

WORKDIR /usr/src/app/BLOG
RUN npm i
RUN npm run build

WORKDIR /usr/src/app/BACK
RUN npm i

EXPOSE 3005

CMD [ "node","server.js" ]