FROM node:16 AS development

WORKDIR /usr/src/app

COPY package*.json yarn.lock ./

RUN yarn add glob rimraf

RUN yarn install

COPY . .

RUN yarn build

FROM node:16 as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package*.json yarn.lock ./

RUN yarn install --production

COPY . .

COPY --from=development /usr/src/app/dist ./dist

CMD ["yarn", "start:prod"]