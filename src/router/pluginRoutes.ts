import { createRouter, createWebHistory } from "vue-router";
import DisplayResult from "../components/DisplayResult.vue";
// import { inject } from "vue";
// export const routerFromHost = inject("router");
const routes = [{ path: "/search-in-tag/:tag", component: DisplayResult }];

const router = createRouter({
  history: createWebHistory(),
  routes,
});
// export function createPluginRouter(history: RouterHistory) {
//   return createRouter({
//     history,
//     routes,
//   });
// }

export default router;
