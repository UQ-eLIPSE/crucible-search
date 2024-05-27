import { createRouter, createWebHistory } from "vue-router";
import DisplayResult from "../components/DisplayResult.vue";
const routes = [{ path: "/search-in-tag/:tag", component: DisplayResult }];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
