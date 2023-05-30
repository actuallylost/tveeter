FROM node:16-alpine

RUN apk add --no-cache bash
WORKDIR /api

COPY package.json .
RUN npm install -g pnpm
RUN pnpm install
COPY . .

CMD ["pnpm", "start:dev"]