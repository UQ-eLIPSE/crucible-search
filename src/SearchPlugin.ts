import { App } from "vue";
import CrucibleSearch from "./components/CrucibleSearch.vue";
import DisplayResult from "./components/DisplayResult.vue";
import CrucibleFilter from "./components/CrucibleFilter.vue";
import { PluginOptions } from "./types";

export function createSearchPlugin(app: App, options: PluginOptions) {
  const { router, getApi, tagsApi } = options;

  // Register plugin components
  app.component("CrucibleSearch", CrucibleSearch);
  app.component("DisplayResult", DisplayResult);
  app.component("CrucibleFilter", CrucibleFilter);
  app.provide("$router", router);
  app.provide("$getApi", getApi);
  app.provide("$tagsApi", tagsApi);
  // Add plugin routes to the existing router
  router.addRoute({ path: "/search", component: DisplayResult });
}

export { CrucibleSearch, DisplayResult, CrucibleFilter };
