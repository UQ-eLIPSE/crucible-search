import { createRouter, createWebHistory, RouterHistory } from "vue-router";
import DisplayResult from "../components/DisplayResult.vue";

const routes = [{ path: "/result-tag-search", component: DisplayResult }];

const router = createRouter({
  history: createWebHistory(),
  routes,
});
export function createPluginRouter(history: RouterHistory) {
  return createRouter({
    history,
    routes,
  });
}

export default router;
