# Stage 1
FROM node:16 as build

RUN mkdir -p /app

WORKDIR /app

COPY package*.json /app/

RUN npm install

COPY . /app

RUN npm run generate-clients

RUN npm run build

# Stage 2
FROM nginx:1.21.6-alpine

EXPOSE 80

COPY --from=build /app/dist/morale-assistant-frontend /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf