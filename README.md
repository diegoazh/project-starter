# Project starter

[![build](https://github.com/diegoazh/project-starter/workflows/build/badge.svg)](https://github.com/diegoazh/project-starter/actions?query=workflow%3Abuild)
[![test](https://github.com/diegoazh/project-starter/workflows/test/badge.svg)](https://github.com/diegoazh/project-starter/actions?query=workflow%3Atest)
[![publish](https://github.com/diegoazh/project-starter/workflows/publish/badge.svg)](https://github.com/diegoazh/project-starter/actions?query=workflow%3Apublish)

## Description

This is a simple starter project for web applications or blogs that requires:

- Frontend: Built on VueJs with Vuetify
- Admin: Built on VueJs with Vuetify
- Backend: Built with NestJs
  - DB tool: Prisma

## Main goal

The main goal of this starter project is make faster the first steps of the development

## How to run this project

[Install docker](https://www.docker.com/products/docker-desktop) on you machine, clone the project and run the following commands.

```bash
$ git clone https://github.com/diegoazh/project-starter.git

$ yarn

$ docker-compose up --build -V
```

For saving or running DB migrations you should run it inside the docker container

```bash
$ docker exec -it backend sh

# when you are in run the followin commands
# to generate and save model changes on migrations
$ npx prisma migrate save --experimental

# to run migrations on the DB
$ npx prisma migrate up --experimental
```

When you made changes on DB models always you need to run the following command to update the
prisma client.

```bash
$ yarn run prisma:generate
```

**Note:** *when you install new packages this should be updated automatically but some times you need to delete all volumes on docker and run again the command `docker-compose up --build -V`, or go inside the docker container en run the installation there too, because the `node_modules` folder inside the docker container is independent from your `node_modules` folder in the host machine.*

## Dependencies

|Name|Version|
|----|-------|
|*lerna*|[![npm version](https://badge.fury.io/js/lerna.svg)](https://badge.fury.io/js/lerna)|
|*commitlint*|[![npm version](https://badge.fury.io/js/commitlint.svg)](https://badge.fury.io/js/commitlint)|
|*husky*|[![npm version](https://badge.fury.io/js/husky.svg)](https://badge.fury.io/js/husky)|
|*lint-staged*|[![npm version](https://badge.fury.io/js/lint-staged.svg)](https://badge.fury.io/js/lint-staged)|

## Tools

This project use **Docker** and **Docker Compose** for development purposes with the following images.

|Image|Version|
|----|-------|
|**Node Alpine**|[![LTS](https://img.shields.io/badge/version-LTS-blue)](https://hub.docker.com/_/node)|
|**mysql**|[![8](https://img.shields.io/badge/version-8-blue)](https://hub.docker.com/_/mysql)|

## Test coverage

You can find the test coverage of each package on the README file of each package.

[**Backend readme**](/packages/backend/README.md#test-coverage)
