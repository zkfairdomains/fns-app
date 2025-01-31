
# fns-app
React Web Application 

## Install Dependencies
to install dependencies, run the following command
```shell
yarn install
```

## Run
to run app, first you need to set you env variables. rename .env.template file to .env then run the following command

```shell
yarn start
```

## How to set REACT_META_DATA_URL correctly?
use the following format to set META_DATA_URL env.
```console
REACT_APP_METADATA_URL={{META_DATA_URL}}/{{NETWORK_NAME}}/{{REGISTRAR_CONTROLLER_CONTRACT_ADDRESS}}/{{TOKEN_ID}}/image
```