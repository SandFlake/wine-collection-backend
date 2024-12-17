import { Router } from "express";
import {
  getWineBottles,
  getWineBottleById,
  updateWineBottle,
  postWineBottle,
  deleteWineBottle,
  uploadWineBottleImage,
} from "../controllers/wineBottleController";
import { upload } from "../utils/fileUploader";

const router = Router();

router.delete("/:id", deleteWineBottle);
router.get("/", getWineBottles);
router.get("/:id", getWineBottleById);
router.post("/", postWineBottle);
router.post("/:id/image", upload.single("image"), uploadWineBottleImage);
router.put("/:id", updateWineBottle);

export default router;
