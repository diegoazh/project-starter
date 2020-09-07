# Development mode
FROM node:lts-alpine

# labels
LABEL name="starter-admin-vuetify"
LABEL version="0.0.1"

#ports
EXPOSE 8080/tcp
EXPOSE 8080/udp

# Args
ARG NODE_ENV=development
ARG ADMIN_WORKING_DIR=usr/admin

# Envs
ENV NODE_ENV=${NODE_ENV}
ENV ADMIN_WORKING_DIR=${ADMIN_WORKING_DIR}

# Display setted ARGS
RUN echo "NODE_ENV = $NODE_ENV"
RUN echo "ADMIN_WORKING_DIR = $ADMIN_WORKING_DIR"

# Create folder and copy package.json
RUN mkdir -p /$ADMIN_WORKING_DIR
WORKDIR /$ADMIN_WORKING_DIR
COPY ./package.json ./
COPY ./yarn.lock ./

# Install dependencies
RUN apk add --no-cache make gcc g++ python
RUN yarn global add pm2
RUN yarn global add @vue/cli
RUN yarn install
# RUN npm rebuild bcrypt --build-from-source
RUN apk del make gcc g++ python

# Copy app files
COPY . .

# Build
RUN yarn run build

# run command
CMD pm2-runtime dist/main.js
