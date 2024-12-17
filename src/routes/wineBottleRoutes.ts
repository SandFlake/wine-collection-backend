import { Router } from "express";
import {
  getWineBottles,
  getWineBottleById,
  updateWineBottle,
  postWineBottle,
  deleteWineBottle,
} from "../controllers/wineBottleController";

const router = Router();

router.delete("/:id", deleteWineBottle);
router.get("/", getWineBottles);
router.get("/:id", getWineBottleById);
router.post("/", postWineBottle);
router.put("/:id", updateWineBottle);

export default router;
