# Stage 1
FROM node:14 as build

RUN mkdir -p /app

WORKDIR /app

COPY package*.json /app/

RUN npm install

COPY . /app

RUN npm run release

# Stage 2
FROM nginx:1.19.6-alpine

EXPOSE 80

COPY --from=build /app/dist/morale-assistant-frontend /usr/share/nginx/html