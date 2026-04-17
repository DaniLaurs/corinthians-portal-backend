import { Request, Response } from "express";
import { db } from "../config/database";

// LISTAR
export const getMatches = async (req: Request, res: Response) => {
  try {
    const result = await db.query(
      "SELECT * FROM matches ORDER BY match_date ASC"
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: "Erro ao buscar jogos" });
  }
};

export const createMatch = async (req: Request, res: Response) => {
  const { home_team, away_team, date, time, competition } = req.body;

  try {
    const result = await db.query(
      `INSERT INTO matches (home_team, away_team, date, time, competition)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *,
       CONCAT(date, 'T', time) AS match_date`,
      [home_team, away_team, date, time, competition]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.log("ERRO CREATE MATCH:", err);
    res.status(500).json({ error: "Erro ao criar jogo" });
  }
};

// EDITAR
export const updateMatch = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { home_team, away_team, date, time, competition } = req.body;

  try {
    const result = await db.query(
      `UPDATE matches
       SET 
         home_team = $1,
         away_team = $2,
         date = $3,
         time = $4,
         competition = $5
       WHERE id = $6
       RETURNING *,
       CONCAT(date, 'T', time) AS match_date`,
      [home_team, away_team, date, time, competition, id]
    );

    res.json(result.rows[0]);
  } catch (err) {
    console.log("ERRO UPDATE MATCH:", err);
    res.status(500).json({ error: "Erro ao atualizar jogo" });
  }
};

// EXCLUIR
export const deleteMatch = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await db.query("DELETE FROM matches WHERE id=$1", [id]);
    res.json({ message: "Jogo deletado" });
  } catch (err) {
    res.status(500).json({ error: "Erro ao deletar jogo" });
  }
};