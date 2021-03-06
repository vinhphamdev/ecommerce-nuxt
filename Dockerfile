FROM node:12.13-alpine as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

RUN npm run build

COPY . .

ENV HOST 0.0.0.0
EXPOSE 4002

CMD ["npm", "start"]