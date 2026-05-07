import { Router } from "express";
import { getStandings } from "../controllers/standings.controller";
import { authMiddleware } from "../middleware/auth.middleware";
import { db } from "../config/database";

const router = Router();

// 🔥 LISTAR
router.get("/", getStandings);

// 🔥 CRIAR
router.post("/", authMiddleware, async (req, res) => {
  try {
    const {
      team_name,
      points,
      played,
      win,
      draw,
      lose,
      goals_diff,
    } = req.body;

    const result = await db.query(
      `
      INSERT INTO standings
      (team_name, points, played, win, draw, lose, goals_diff)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *
      `,
      [team_name, points, played, win, draw, lose, goals_diff]
    );

    res.status(201).json(result.rows[0]);

  } catch (error) {
    console.log("ERRO CREATE STANDING:", error);

    res.status(500).json({
      message: "Erro ao criar classificação",
    });
  }
});

// 🔥 EDITAR
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;

    const {
      team_name,
      points,
      played,
      win,
      draw,
      lose,
      goals_diff,
    } = req.body;

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
      [
        team_name,
        points,
        played,
        win,
        draw,
        lose,
        goals_diff,
        id,
      ]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Time não encontrado",
      });
    }

    res.json(result.rows[0]);

  } catch (error) {
    console.log("ERRO UPDATE STANDING:", error);

    res.status(500).json({
      message: "Erro ao atualizar classificação",
    });
  }
});

// 🔥 EXCLUIR
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;

    await db.query(
      "DELETE FROM standings WHERE id = $1",
      [id]
    );

    res.json({
      message: "Time removido com sucesso",
    });

  } catch (error) {
    console.log("ERRO DELETE STANDING:", error);

    res.status(500).json({
      message: "Erro ao deletar classificação",
    });
  }
});

export default router;