import { Router } from "express";
import { toggleLike, getLikes, userLiked } from "../controllers/likes.controller";
import { authMiddleware } from "../middleware/auth.middleware";
import { db } from "../config/database";

const router = Router();

// 👍 curtir / descurtir
router.post("/", authMiddleware, toggleLike);

// 📊 total de likes da notícia
router.get("/:newsId", getLikes);

// 👤 saber se usuário já curtiu
router.get("/check/:newsId", authMiddleware, userLiked);

router.get("/user/:id", authMiddleware, async (req, res) => {
  const user_id = req.params.id;

  const result = await db.query(
    `
    SELECT likes.*, news.title
    FROM likes
    JOIN news ON news.id = likes.news_id
    WHERE likes.user_id = $1
    `,
    [user_id]
  );

  res.json(result.rows);
});

export default router;