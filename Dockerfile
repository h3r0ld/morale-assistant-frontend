# Stage 1
FROM node:16 as build

# Need to install JRE, because openapi-generate-cli uses java...
RUN apt-get update && apt-get -y install default-jre

RUN mkdir -p /app

WORKDIR /app

COPY . /app

RUN npm ci

RUN npm run generate-clients

RUN npm run build

# Stage 2
FROM nginx:1.21.6-alpine

EXPOSE 80

COPY --from=build /app/dist/morale-assistant-frontend /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
