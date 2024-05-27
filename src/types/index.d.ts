import { Router } from "vue-router";
export type PluginOptions = {
  router: Router;
  getApi: string;
};

declare module "@vue/runtime-core" {
  interface ComponentCustomProperties {
    $router: string;
    $getApi: string;
  }
}
