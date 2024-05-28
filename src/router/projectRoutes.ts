import { createRouter, createWebHistory } from "vue-router";
import DispalyResult from "../components/DisplayResult.vue";
import App from "@/App.vue";
const routes = [
  { path: "/", component: App },
  { path: "/search-in-tag", component: DispalyResult },
];

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

// export default router;
