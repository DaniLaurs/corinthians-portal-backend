import { Router } from "express";
import { adminMiddleware } from "../middleware/admin.middleware";
import { authMiddleware } from "../middleware/auth.middleware";
import {
  createNews,
  getAllNews,
  getNewsById,
  deleteNews,
  updateNews

} from "../controllers/news.controller";

const router = Router();

router.post("/", authMiddleware, adminMiddleware, createNews);
router.get("/:id", getNewsById);
router.get("/", getAllNews);
router.delete("/:id", authMiddleware, adminMiddleware, deleteNews);
router.put("/:id", authMiddleware, adminMiddleware, updateNews);

export default router;