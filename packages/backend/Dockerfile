# Development mode
FROM node:lts-alpine

# labels
LABEL name="starter-nestjs-backend"
LABEL version="0.0.1"

#ports
EXPOSE 3000/tcp
EXPOSE 3000/udp

# Args
ARG NODE_ENV=development
ARG BACKEND_WORKING_DIR=usr/backend

# Envs
ENV NODE_ENV=${NODE_ENV}
ENV BACKEND_WORKING_DIR=${BACKEND_WORKING_DIR}

# Display setted ARGS
RUN echo "NODE_ENV = $NODE_ENV"
RUN echo "BACKEND_WORKING_DIR = $BACKEND_WORKING_DIR"

# Create folder and copy package.json
RUN mkdir -p /$BACKEND_WORKING_DIR
WORKDIR /$BACKEND_WORKING_DIR
COPY ./package.json ./
COPY ./yarn.lock ./

# Install dependencies
RUN apk add --no-cache make gcc g++ python
RUN yarn global add pm2
RUN yarn global add @nestjs/cli
RUN yarn install
# RUN npm rebuild bcrypt --build-from-source
RUN apk del make gcc g++ python

# Copy app files
COPY . .

# Build
RUN yarn run build

# run command
CMD pm2-runtime dist/main.js
