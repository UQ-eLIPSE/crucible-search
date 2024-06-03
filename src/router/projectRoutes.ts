import { createRouter, createWebHistory } from "vue-router";
import DispalyResult from "../components/DisplayResult.vue";
import App from "@/App.vue";
const routes = [
  { path: "/", component: App },
  { path: "/search", component: DispalyResult },
];

export const projectRoutes = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});
