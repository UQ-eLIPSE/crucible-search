import { App } from "vue";

import CrucibleSearch from "./components/CrucibleSearch.vue";
import { PluginOptions } from "./types";

export const defaultData = {
  data: {
    questions: [
      {
        _id: { $oid: "6625c7c8c8259deb8c3af39e" },
        statement: "",
        tags: [""],
        optionsList: { optionValue: "", optionCorrect: false },
        link: "",
      },
    ],
  },
};

export function createSearchPlugin(app: App, options: PluginOptions = {}) {
  app.component("CrucibleSearch", CrucibleSearch);
  app.provide("$dataLink", options.dataLink || defaultData);
}

export { CrucibleSearch };
