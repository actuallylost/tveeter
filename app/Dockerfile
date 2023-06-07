FROM node:16.15-alpine

RUN apk add --no-cache bash
RUN apk add --no-cache --virtual .builds-deps build-base python3
WORKDIR /app

COPY package.json .
RUN npm install -g pnpm
RUN pnpm install
RUN pnpm build
COPY . .

CMD ["pnpm", "start"]