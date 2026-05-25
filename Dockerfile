FROM node:24.15.0

WORKDIR /app

COPY package*.json ./

ENV HUSKY=0
RUN npm ci

COPY . .
