import { Router } from "express";
import { createComment, getComments, getCommentsByNews } from "../controllers/comment.controller";
import { authMiddleware } from "../middleware/auth.middleware";

const router = Router();

router.post("/", authMiddleware, createComment);
router.get("/", getComments);
// buscar comentários por notícia (público)
router.get("/:newsId", getCommentsByNews);



export default router;