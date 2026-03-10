import { Request, Response } from "express";
import { db } from "../config/database";

export const createComment = async (req: Request, res: Response) => {
  try {
    const { content, news_id } = req.body;
    const user = (req as any).user;

    if (!content || !news_id) {
      return res.status(400).json({
        message: "Comentário ou notícia não informados",
      });
    }

    // verificar se notícia existe
    const newsResult = await db.query(
      "SELECT id FROM news WHERE id = $1",
      [news_id]
    );

    if (newsResult.rows.length === 0) {
      return res.status(404).json({
        message: "Notícia não encontrada",
      });
    }

    await db.query(
      "INSERT INTO comments (content, user_id, news_id) VALUES ($1, $2, $3)",
      [content, user.id, news_id]
    );

    return res.status(201).json({
      message: "Comentário criado com sucesso ⚽",
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Erro no servidor",
    });
  }
};

export const getComments = async (req: Request, res: Response) => {
  try {
    const { news_id } = req.query;

    if (!news_id) {
      return res.status(400).json({
        message: "Informe o ID da notícia",
      });
    }

    const result = await db.query(
      `
      SELECT 
        comments.id,
        comments.content,
        comments.created_at,
        users.name
      FROM comments
      JOIN users ON users.id = comments.user_id
      WHERE comments.news_id = $1
      ORDER BY comments.created_at DESC
      `,
      [news_id]
    );

    return res.status(200).json(result.rows);

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Erro ao buscar comentários",
    });
  }
};