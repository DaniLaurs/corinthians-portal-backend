import { Router } from "express";
import { adminMiddleware } from "../middleware/admin.middleware";
import { authMiddleware } from "../middleware/auth.middleware";
import {
  createNews,
  getAllNews,
  getNewsById,
  deleteNews,
} from "../controllers/news.controller";

const router = Router();

router.post("/", authMiddleware, adminMiddleware, createNews);
router.get("/", getAllNews);
router.get("/:id", getNewsById);
router.delete("/:id", authMiddleware, adminMiddleware, deleteNews);

export default router;