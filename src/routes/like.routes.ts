import { Router } from "express";
import { toggleLike, getLikes, userLiked } from "../controllers/like.controller";
import { authMiddleware } from "../middleware/auth.middleware";

const router = Router();

// 👍 curtir / descurtir
router.post("/", authMiddleware, toggleLike);

// 📊 total de likes da notícia
router.get("/:newsId", getLikes);

// 👤 saber se usuário já curtiu
router.get("/user/:newsId", authMiddleware, userLiked);

export default router;