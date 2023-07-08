FROM node:16.15-alpine

RUN apk add --no-cache bash
RUN apk add --no-cache --virtual .builds-deps build-base python3
ENV NODE_ENV production
WORKDIR /api

COPY package.json .
RUN npm install -g pnpm
RUN pnpm install
RUN pnpm prisma generate
RUN pnpm build
COPY . .

CMD ["pnpm", "start:prod"]