## Description

this is a Nest js microservice for Footbal matches.

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

Install npm dependencies.

```bash
$ npm install
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

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
