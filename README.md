# Crucible Search

This is a project for creating crucible Search / Filter that will be used as part of the Crucible Repository.

Node version requirement: 20.x

## Install Project as a package

- `yarn add https://github.com/UQ-eLIPSE/crucible-search.git#main`

- Import plugin:

  1.  find `main.ts` in plugin host project and add:
      `import { createSearchFilterPlugin } from "crucible-search"`,
      `import "crucible-search/dist/styles.css"`,

          `createSearchPlugin(app, {

      router: router-in-host-project
      getApi: Api-for-query-searchresult,
      tagsApi: Api-for-get-all-tags,
      filterSetApi: Api-for-get-taxonomyTags,
      });`

  2.  in the component, implement the following directly:
      <CrucibleSearch />
      <CrucibleFilter @update-filter-tag-array="event-func-name" @check-taxonomy-exists="event-func-name"/>
      <CollapseBtn :showDropdown="isDropdownShown" />

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
