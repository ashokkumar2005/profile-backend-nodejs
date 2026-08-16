import { Router } from "express";
import { protect } from "../middleware/auth.js";

export function buildResourceRouter(controller) {
  const router = Router();

  router.get("/", controller.getAll);
  router.get("/:id", controller.getOne);
  router.post("/", protect, controller.create);
  router.put("/:id", protect, controller.update);
  router.delete("/:id", protect, controller.remove);

  return router;
}
