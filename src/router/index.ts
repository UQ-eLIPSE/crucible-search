import { createRouter, createWebHistory } from "vue-router";
import Search from "../components/DisplaySearch.vue";
import Result from "../components/DisplayResult.vue";

const routes = [
  { path: "/", component: Search },
  { path: "/results", component: Result },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
