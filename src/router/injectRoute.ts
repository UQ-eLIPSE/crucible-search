// useRouter.ts
import { inject } from "vue";
import { Router } from "vue-router";

export function useRouter(): Router {
  const router = inject("$router") as Router;
  if (!router) {
    throw new Error("Router instance is not provided");
  }
  console.log(router);
  return router;
}
