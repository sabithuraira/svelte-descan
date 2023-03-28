FROM node:lts-alpine AS build

WORKDIR /app

COPY package*.json .
RUN npm i
COPY . .
RUN mv svelte-docker.config.js svelte.config.js
RUN npm run build

FROM node:lts-alpine AS deploy

WORKDIR /app

COPY --from=build /app/package*.json .
RUN npm ci --omit dev
COPY --from=build /app/build .
CMD [ "node", "index.js" ]