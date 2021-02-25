ARG NODE_VERSION

FROM node:${NODE_VERSION}-alpine AS build

WORKDIR /app

COPY . .

RUN npm ci
RUN npm run build
RUN npx pkg dist/src/main.js
RUN ls -lah

RUN ls -la /lib/

FROM scratch

COPY --from=build /app/main /add-connect

CMD [ "/add-connect" ]
