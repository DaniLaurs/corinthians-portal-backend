import { Router } from "express";
import { createComment, getComments, getCommentsByNews } from "../controllers/comment.controller";
import { authMiddleware } from "../middleware/auth.middleware";
import { db } from "../config/database";

const router = Router();

router.post("/", authMiddleware, createComment);
router.get("/", getComments);
// buscar comentários por notícia (público)
router.get("/:news_id", (req, res, next) => {
  console.log("🔥 ENTROU NA ROTA COMMENTS");
  next();
}, getCommentsByNews);

router.get("/user/:id", authMiddleware, async (req, res) => {
  const user_id = req.params.id;

  const result = await db.query(
    `
    SELECT comments.*, news.title
    FROM comments
    JOIN news ON news.id = comments.news_id
    WHERE comments.user_id = $1
    ORDER BY comments.created_at DESC
    `,
    [user_id]
  );

  res.json(result.rows);
});

export default router;