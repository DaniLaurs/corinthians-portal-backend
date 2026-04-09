import { Router } from "express";
import {
  getTeams,
  createTeam,
  deleteTeam
  } from "../controllers/teams.controller";

  import { authMiddleware } from "../middleware/auth.middleware";

const router = Router();

router.get("/", getTeams);
router.post("/", authMiddleware, createTeam);
router.delete("/:id", authMiddleware, deleteTeam);

export default router;