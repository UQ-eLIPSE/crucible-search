import { inject } from "vue";
import { Router } from "vue-router";

import { createRouter, createWebHistory } from "vue-router";
import DisplayResult from "../components/DisplayResult.vue";

const routes = [
  { path: "/search-in-tag/:tag", component: DisplayResult, props: true },
];

export function useRouter(): Router {
  const injectedRouter = inject("router") as Router;
  if (injectedRouter) {
    // If a router instance is injected, use it
    return injectedRouter;
  } else {
    // If no router instance is injected, create a new one
    const localRouter = createRouter({
      history: createWebHistory(import.meta.env.BASE_URL),
      routes,
    });
    return localRouter;
  }
}
