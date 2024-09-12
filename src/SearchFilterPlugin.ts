import { App } from "vue";
import CrucibleSearch from "./components/CrucibleSearch.vue";
import DisplayResult from "./components/DisplayResult.vue";
import CrucibleFilter from "./components/CrucibleFilter.vue";
import CollapseBtn from "./components/CollapseBtn.vue";
import { PluginOptions } from "./types";

export function createSearchFilterPlugin(app: App, options: PluginOptions) {
  const { router, getApi, tagsApi, filterSetApi, filterResourcesApi } = options;

  // Register plugin components
  app.component("CrucibleSearch", CrucibleSearch);
  app.component("DisplayResult", DisplayResult);
  app.component("CrucibleFilter", CrucibleFilter);
  app.component("CollapseBtn", CollapseBtn);
  app.provide("$router", router || null);
  app.provide("$getApi", getApi || null);
  app.provide("$tagsApi", tagsApi || null);
  app.provide("$filterSetApi", filterSetApi || null);
  app.provide("$filterResourcesApi", filterResourcesApi || null);

  // Add plugin routes to the existing router
  router.addRoute({ path: "/search", component: DisplayResult });
}

export { CrucibleSearch, DisplayResult, CrucibleFilter, CollapseBtn };
