import { Router } from "express";
import { createComment, getComments } from "../controllers/comment.controller";
import { authMiddleware } from "../middleware/auth.middleware";

const router = Router();

router.post("/", authMiddleware, createComment);
router.get("/", getComments);


export default router;