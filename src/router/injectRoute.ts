// useRouter.ts
import { inject } from "vue";
import { Router } from "vue-router";
import { router as ProjectRouter } from "@/router/projectRoutes";
// const projectRouter = router;

export function useRouter(): Router {
  const router = inject("$router") as Router;
  if (!router) {
    //  throw new Error("Router instance is not provided");
    return ProjectRouter;
  }

  return router;
}
