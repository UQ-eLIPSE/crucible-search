import { App } from "vue";
import CrucibleSearch from "./components/CrucibleSearch.vue";
import DisplayResult from "./components/DisplayResult.vue";
import { PluginOptions } from "./types";

export function createSearchPlugin(app: App, options: PluginOptions) {
  const { router, getApi } = options;

  // Register plugin components
  app.component("CrucibleSearch", CrucibleSearch);
  app.component("DisplayResult", DisplayResult);
  app.provide("$router", router);
  app.provide("$getApi", getApi);
  // Add plugin routes to the existing router
  router.addRoute({ path: "/search-in-tag", component: DisplayResult });
}

export { CrucibleSearch, DisplayResult };
