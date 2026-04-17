import { Request, Response } from "express";
import { db } from "../config/database";

// 🔥 LISTAR (ORDENA CORRETAMENTE POR DATA + HORA)
export const getMatches = async (req: Request, res: Response) => {
  try {
    const result = await db.query(`
      SELECT 
        id,
        home_team,
        away_team,
        competition,
        date,
        time,
        CONCAT(date, 'T', time) AS match_date
      FROM matches
      ORDER BY date ASC, time ASC
    `);

    res.json(result.rows);
  } catch (err) {
    console.log("ERRO GET MATCHES:", err);
    res.status(500).json({ error: "Erro ao buscar jogos" });
  }
};

// 🔥 CRIAR
export const createMatch = async (req: Request, res: Response) => {
  const { home_team, away_team, date, time, competition } = req.body;

  try {
    // ✅ GARANTE FORMATO CORRETO
    const formattedTime = time?.slice(0, 5); // HH:mm

    const result = await db.query(
      `INSERT INTO matches (home_team, away_team, date, time, competition)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING 
         id,
         home_team,
         away_team,
         competition,
         date,
         time,
         CONCAT(date, 'T', time) AS match_date`,
      [home_team, away_team, date, formattedTime, competition]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.log("ERRO CREATE MATCH:", err);
    res.status(500).json({ error: "Erro ao criar jogo" });
  }
};

// 🔥 EDITAR
export const updateMatch = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { home_team, away_team, date, time, competition } = req.body;

  try {
    // ✅ GARANTE FORMATO CORRETO
    const formattedTime = time?.slice(0, 5);

    const result = await db.query(
      `UPDATE matches
       SET 
         home_team = $1,
         away_team = $2,
         date = $3,
         time = $4,
         competition = $5
       WHERE id = $6
       RETURNING 
         id,
         home_team,
         away_team,
         competition,
         date,
         time,
         CONCAT(date, 'T', time) AS match_date`,
      [home_team, away_team, date, formattedTime, competition, id]
    );

    res.json(result.rows[0]);
  } catch (err) {
    console.log("ERRO UPDATE MATCH:", err);
    res.status(500).json({ error: "Erro ao atualizar jogo" });
  }
};

// 🔥 EXCLUIR
export const deleteMatch = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await db.query("DELETE FROM matches WHERE id=$1", [id]);
    res.json({ message: "Jogo deletado" });
  } catch (err) {
    console.log("ERRO DELETE MATCH:", err);
    res.status(500).json({ error: "Erro ao deletar jogo" });
  }
};