# Base image
FROM node:18-alpine


RUN npm i -g pnpm

COPY package*.json pnpm-lock.yaml ./

RUN pnpm install

COPY . .

CMD pnpm start