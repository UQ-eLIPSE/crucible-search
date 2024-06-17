import { Router } from "vue-router";
export type PluginOptions = {
  router: Router;
  getApi?: string;
  tagsApi?: string;
};

export type ResourceInSearch = {
  _id: string;
  label: string;
  tags: string[];
  url: string;
};

declare module "@vue/runtime-core" {
  interface ComponentCustomProperties {
    $router: string;
    $getApi: string;
    $tagsApi: string;
  }
}
