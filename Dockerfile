FROM node:lts-alpine AS build

WORKDIR /app

COPY . .
RUN npm install
RUN mv svelte-docker.config.js svelte.config.js
RUN npm run build

FROM node:lts-alpine AS deploy

WORKDIR /app

COPY --from=build /app/build .
CMD [ "node", "index.js" ]