import { Request, Response } from "express";
import { db } from "../config/database";

// LISTAR
export const getTeams = async (req: Request, res: Response) => {
  try {
    const result = await db.query("SELECT * FROM teams");
    res.json(result.rows);
  } catch {
    res.status(500).json({ error: "Erro ao buscar times" });
  }
};

// CRIAR
export const createTeam = async (req: Request, res: Response) => {
  const { name, logo_url } = req.body;

  try {
    const result = await db.query(
      "INSERT INTO teams (name, logo_url) VALUES ($1, $2) RETURNING *",
      [name, logo_url]
    );

    res.status(201).json(result.rows[0]);
  } catch {
    res.status(500).json({ error: "Erro ao criar time" });
  }
};

// DELETE
export const deleteTeam = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await db.query("DELETE FROM teams WHERE id=$1", [id]);
    res.json({ message: "Time deletado" });
  } catch {
    res.status(500).json({ error: "Erro ao deletar" });
  }
};