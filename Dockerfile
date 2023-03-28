FROM node:lts-alpine AS build

WORKDIR /app

COPY . .
RUN npm i
RUN mv svelte-docker.config.js svelte.config.js
RUN npm run build

FROM node:lts-alpine AS deploy

WORKDIR /app

COPY --from=build /app/package*.json .
COPY --from=build /app/build .
RUN npm ci --omit dev
CMD [ "node", "index.js" ]