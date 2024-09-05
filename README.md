## Description

This is a Nestjs microservice for creating Footbal matches.

## Project setup

Be sure you always have the node version from ".nvmrc" file. if you use "Oh My ZSH!" you can add this code to your ~/.zshrc to trigger "nvm use" when inside the project directory.

```bash
autoload -U add-zsh-hook

load-nvmrc() {
  local node_version
  if [[ -f .nvmrc ]]; then
    node_version=$(nvm version)
    nvm use --silent > /dev/null
    if [[ $? -ne 0 ]]; then
      nvm install
    fi
  elif [[ $node_version != "N/A" ]]; then
    nvm use default
  fi
}

add-zsh-hook chpwd load-nvmrc
load-nvmrc
```
Rename the .env.template file to .env and add the local mongodb uri connection.

```bash
MONGODB_CONNECTION_STRING=mongodb://localhost:27017/wamesports
PORT=3000
```

Install npm dependencies.

```bash
$ npm install
```

This project uses a mongodb instance. To run the database use

```bash
$ npm infra:up
$ npm infra:down
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

This projects combine unit and e2e testing. For e2e testing we use the testcontainers library. It creates a mongodb instance only for testing purposes.

```bash
# unit tests
$ npm run test:unit

# e2e tests
$ npm run test:e2e

# test all
$ npm run test

# test coverage
$ npm run test:cov
```

## Git Hooks

Husky library is managing the pre-commit, pre-push and commit lint using @commitlint/config-conventional.

## OpenApi Docs

The API documentation is created automatically in http://localhost:3000/docs