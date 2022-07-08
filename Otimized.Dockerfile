# This dockerfile is based in https://github.com/vercel/next.js/blob/canary/examples/with-docker/Dockerfile

# Install dependencies
FROM node:16 as deps
WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile

# Create dist folder
FROM node:16 as builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN yarn build

# Generate final image
FROM node:16 AS runner
WORKDIR /app

ENV NODE_ENV production

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/yarn.lock ./yarn.lock

RUN apt-get install -y bash

# Install puppeteer deps
RUN apt-get update \
  && apt-get install -y wget gnupg \
  && wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
  && sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' \
  && apt-get update \
  && apt-get install -y google-chrome-stable fonts-ipafont-gothic fonts-wqy-zenhei fonts-thai-tlwg fonts-kacst fonts-freefont-ttf libxss1 \
  --no-install-recommends \
  && rm -rf /var/lib/apt/lists/*

# Remove dev deps
RUN yarn install --production

CMD ["yarn", "start:prod"]
