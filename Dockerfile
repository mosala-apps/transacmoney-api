FROM node:18-alpine As development

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --legacy-peer-deps

COPY . .

RUN npm run build

FROM node:18-alpine As production

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --only=production

COPY  . .

COPY --from=development /usr/src/app/dist ./dist

CMD [ "node" ,"dist/main"]