import { Router } from "express";
import { getStandings } from "../controllers/standings.controller";
import { authMiddleware } from "../middleware/auth.middleware";
import { db } from "../config/database";

const router = Router();

router.get("/", getStandings);

router.put("/:id", authMiddleware, async (req, res) => {
  const { id } = req.params;
  const { team_name, points, played, win, draw, lose, goals_diff } = req.body;

  const result = await db.query(
    `
    UPDATE standings
    SET 
      team_name = $1,
      points = $2,
      played = $3,
      win = $4,
      draw = $5,
      lose = $6,
      goals_diff = $7
    WHERE id = $8
    RETURNING *
    `,
    [team_name, points, played, win, draw, lose, goals_diff, id]
  );

  if (result.rows.length === 0) {
    return res.status(404).json({ message: "Time não encontrado" });
  }

  res.json(result.rows[0]);
});

export default router;