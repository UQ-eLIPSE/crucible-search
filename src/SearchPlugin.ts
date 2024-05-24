import { App } from "vue";

import CrucibleSearch from "./components/CrucibleSearch.vue";

export function createSearchPlugin(app: App) {
  app.component("CrucibleSearch", CrucibleSearch);
}

export { CrucibleSearch };
