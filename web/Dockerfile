FROM oven/bun:alpine

RUN apk add --no-cache bash
RUN apk add --no-cache --virtual .builds-deps build-base python3
ENV NODE_ENV production
WORKDIR /app

COPY package.json .
RUN bun add --global pnpm
RUN pnpm install
RUN pnpm build
COPY . .

CMD ["pnpm", "start"]