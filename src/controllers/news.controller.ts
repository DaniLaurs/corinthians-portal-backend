import { Request, Response } from "express";
import { db } from "../config/database";

export const createNews = async (req: Request, res: Response) => {
  try {
    const { title, content, image_url } = req.body;

    if (!title || !content) {
      return res.status(400).json({
        message: "Título e conteúdo são obrigatórios",
      });
    }

    await db.query(
      "INSERT INTO news (title, content, image_url) VALUES ($1, $2, $3)",
      [title, content, image_url || null]
    );

    return res.status(201).json({
      message: "Notícia criada com sucesso ⚽",
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Erro no servidor",
    });
  }
};

export const getAllNews = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 5;

    const offset = (page - 1) * limit;

    const result = await db.query(
      "SELECT * FROM news ORDER BY created_at DESC LIMIT $1 OFFSET $2",
      [limit, offset]
    );

    const totalResult = await db.query(
      "SELECT COUNT(*) as total FROM news"
    );

    const total = totalResult.rows[0].total;
    const totalPages = Math.ceil(total / limit);

    return res.status(200).json({
      page,
      totalPages,
      totalItems: total,
      data: result.rows,
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Erro no servidor",
    });
  }
};

export const getNewsById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const result = await db.query(
      "SELECT * FROM news WHERE id = $1",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Notícia não encontrada",
      });
    }

    return res.status(200).json(result.rows[0]);

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Erro ao buscar notícia",
    });
  }
};

export const deleteNews = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    await db.query(
      "DELETE FROM news WHERE id = $1",
      [id]
    );

    return res.status(200).json({
      message: "Notícia deletada com sucesso",
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Erro ao deletar notícia",
    });
  }
};