import { Router } from "express";
import {
  getMatches,
  createMatch,
  updateMatch,
  deleteMatch
} from "../controllers/matches.controller";
import { authMiddleware } from "../middleware/auth.middleware";

const router = Router();

router.get("/", getMatches);
router.post("/", authMiddleware, createMatch);
router.put("/:id", authMiddleware, updateMatch);
router.delete("/:id", authMiddleware, deleteMatch);

export default router;