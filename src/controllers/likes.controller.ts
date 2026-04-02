import { Request, Response } from "express";
import { db } from "../config/database";


// 👍 CURTIR / DESCURTIR (TOGGLE)
export const toggleLike = async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;

    const { news_id } = req.body as { news_id: number };

    if (!news_id) {
      return res.status(400).json({
        message: "ID da notícia é obrigatório",
      });
    }

    // 🔍 verifica se já curtiu
    const existing = await db.query(
      "SELECT * FROM likes WHERE user_id = $1 AND news_id = $2",
      [user.id, news_id]
    );

    if (existing.rows.length > 0) {
      // ❌ remove like
      await db.query(
        "DELETE FROM likes WHERE user_id = $1 AND news_id = $2",
        [user.id, news_id]
      );

      return res.status(200).json({
        liked: false,
        message: "Like removido",
      });
    }

    // ✅ adiciona like
    await db.query(
      "INSERT INTO likes (user_id, news_id) VALUES ($1, $2)",
      [user.id, news_id]
    );

    return res.status(201).json({
      liked: true,
      message: "Like adicionado",
    });

  } catch (error) {
    console.error("Erro no toggleLike:", error);
    return res.status(500).json({
      message: "Erro no servidor",
    });
  }
};



// 📊 TOTAL DE LIKES DA NOTÍCIA
export const getLikes = async (req: Request, res: Response) => {
  try {
    const { newsId } = req.params;

    const result = await db.query(
      "SELECT COUNT(*) FROM likes WHERE news_id = $1",
      [newsId]
    );

    return res.status(200).json({
      total: Number(result.rows[0].count),
    });

  } catch (error) {
    console.error("Erro ao buscar likes:", error);
    return res.status(500).json({
      message: "Erro ao buscar likes",
    });
  }
};



// 👤 VERIFICAR SE USUÁRIO CURTIU
export const userLiked = async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;
    const { newsId } = req.params;

    const result = await db.query(
      "SELECT * FROM likes WHERE user_id = $1 AND news_id = $2",
      [user.id, newsId]
    );

    return res.status(200).json({
      liked: result.rows.length > 0,
    });

  } catch (error) {
    console.error("Erro ao verificar like:", error);
    return res.status(500).json({
      message: "Erro ao verificar like",
    });
  }
};