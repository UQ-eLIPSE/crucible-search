import { createRouter, createWebHistory, RouterHistory } from "vue-router";
import DisplayResult from "../components/DisplayResult.vue";
// import CrucibleSearch from "@/components/CrucibleSearch.vue";

const routes = [
  // { path: "/", component: CrucibleSearch },
  { path: "/result-tag-search", component: DisplayResult },
];

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
