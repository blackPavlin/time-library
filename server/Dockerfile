FROM node:alpine as build

WORKDIR /build
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:alpine

WORKDIR /root
COPY --from=build /build/package*.json ./
RUN npm install --only=production
COPY --from=build /build/dist ./build/
COPY --from=build /build/env ./env/
EXPOSE 3000
CMD ["node", "./build/app"]
