import { Router } from "vue-router";
export type PluginOptions = {
  router: Router;
};

declare module "@vue/runtime-core" {
  interface ComponentCustomProperties {
    $router: string;
  }
}
