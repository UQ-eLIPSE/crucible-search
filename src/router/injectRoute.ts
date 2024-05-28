import { inject } from "vue";
import { Router } from "vue-router";
import { router as projectRoutes } from "./projectRoutes";

export function useRouter(): Router {
  const router = inject("$router") as Router;
  if (!router) {
    return projectRoutes;
  }

  return router;
}
