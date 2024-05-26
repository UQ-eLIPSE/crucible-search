// my-vue-plugin/src/index.ts
import { App } from "vue";
import CrucibleSearch from "./components/CrucibleSearch.vue";
import DisplayResult from "./components/DisplayResult.vue";

import { Router } from "vue-router";

interface PluginOptions {
  router: Router;
}

export function createSearchPlugin(app: App, options: PluginOptions) {
  console.log("Creating Search Plugin");

  const { router } = options;

  // Register plugin components
  app.component("CrucibleSearch", CrucibleSearch);
  app.component("DisplayResult", DisplayResult);
  app.provide("router", router);
  // Add plugin routes to the existing router
  router.addRoute({ path: "/result-tag-search", component: DisplayResult });
  console.log("Router", router);
}

export { CrucibleSearch, DisplayResult };
