import { Router } from "vue-router";
export type PluginOptions = {
  router: Router;
  getApi: string;
};

export type ResourceInSearch = {
  label: string;
  tags: string[];
};

declare module "@vue/runtime-core" {
  interface ComponentCustomProperties {
    $router: string;
    $getApi: string;
  }
}
