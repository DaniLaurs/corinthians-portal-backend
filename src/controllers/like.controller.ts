import { db } from "../config/database";

export const toggleLike = async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;
    const { news_id } = req.body;

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

      return res.json({ liked: false });
    }

    // ✅ adiciona like
    await db.query(
      "INSERT INTO likes (user_id, news_id) VALUES ($1, $2)",
      [user.id, news_id]
    );

    return res.json({ liked: true });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Erro no like" });
  }
};

export const getLikes = async (req: Request, res: Response) => {
  const { newsId } = req.params;

  const result = await db.query(
    "SELECT COUNT(*) FROM likes WHERE news_id = $1",
    [newsId]
  );

  res.json({ total: parseInt(result.rows[0].count) });
};

export const userLiked = async (req: Request, res: Response) => {
  const user = (req as any).user;
  const { newsId } = req.params;

  const result = await db.query(
    "SELECT * FROM likes WHERE user_id = $1 AND news_id = $2",
    [user.id, newsId]
  );

  res.json({ liked: result.rows.length > 0 });
};