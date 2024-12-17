import { Router } from "express";
import {
  deleteWinemaker,
  getWinemakers,
  getWinemakerById,
  postWinemaker,
  updateWinemaker,
} from "../controllers/winemakerController";

const router = Router();

router.delete("/:id", deleteWinemaker);
router.get("/", getWinemakers);
router.get("/:id", getWinemakerById);
router.post("/", postWinemaker);
router.put("/:id", updateWinemaker);

export default router;
