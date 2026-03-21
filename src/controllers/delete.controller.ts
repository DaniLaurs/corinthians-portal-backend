import { Request, Response } from "express";
import { db } from "../config/database";

export const deleteNews = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    await db.query("DELETE FROM news WHERE id = $1", [id]);

    return res.json({ message: "Notícia deletada com sucesso" });

  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Erro ao deletar notícia" });
  }
};