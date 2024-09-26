# Reward History

**Technology stack：** vue3 + vuex + vue-router + webpack + sass + element-plus

## Installation dependency

Run `yarn install` to generate component.

## Development server

Run `npm run serve` for a dev server. Navigate to `http://localhost:8080/`. The app will automatically reload if you change any of the source files.

## Build project

```shell
# Build production projects
$ npm run build:prod_t / npm run build:prod_u / npm run build:prod
# You can use the npm run build command without any suffix if you are using a version of Node lower than 16, or you should use the command with the suffix name if you are using a version higher than 16
# The only difference between _t and _u is that _t uses the set keyword while _u uses the export keyword, and how you use it depends on which keyword your system supports.
```

The build artifacts will be stored in the `dist_prod` directory.

## Pre order preparation

**Preparation before operation:**

Since this project is based on nodejs, you need to make preparations for nodejs. Before running the project, please ensure that the following applications have been installed in the system:

(1)、Node (Version v18.12.1 of Node was used for this project). Please refer to:[Download and install node.](https://nodejs.org/en/download/)

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).
