# Crucible Search

This is a project for creating crucible search that will be used as part of the Crucible Repository.

Node version requirement: 20.11

## Install Project as a package

- `yarn add https://github.com/UQ-eLIPSE/crucible-search.git#main`

- Import plugin:

  1. find `main.ts` in plugin host project and add:
     `import { createSearchPlugin } from "crucible-search"`,
     `import "crucible-search/dist/styles.css"`,

     `createSearchPlugin(app, {dataLink: await Api.Resource.getQuestions() });`

  2. in the component, implement the following directly:
     <CrucibleSearch />

### Build Project as a package

```sh
BUILDASLIBRARY=true yarn build
```

or

```sh
yarn build:lib
```

### Run test app

```sh
yarn serve:test
```
