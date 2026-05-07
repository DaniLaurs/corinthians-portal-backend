import { Request, Response } from "express";
import { db } from "../config/database";

export const getStandings = async (
  req: Request,
  res: Response
) => {
  try {
    const result = await db.query(`
      SELECT *
      FROM standings
      ORDER BY
        points DESC,
        goals_diff DESC,
        win DESC
    `);

    res.json(result.rows);

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Erro ao buscar classificação",
    });
  }
};