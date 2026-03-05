"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getComments = exports.createComment = void 0;
const database_1 = require("../config/database");
const createComment = async (req, res) => {
    try {
        const { content, news_id } = req.body;
        const user = req.user;
        if (!content || !news_id) {
            return res.status(400).json({
                message: "Comentário ou notícia não informados",
            });
        }
        // 🔎 Verificar se a notícia existe
        const [news] = await database_1.db.query("SELECT id FROM news WHERE id = ?", [news_id]);
        if (news.length === 0) {
            return res.status(404).json({
                message: "Notícia não encontrada",
            });
        }
        await database_1.db.query("INSERT INTO comments (content, user_id, news_id) VALUES (?, ?, ?)", [content, user.id, news_id]);
        return res.status(201).json({
            message: "Comentário criado com sucesso ⚽",
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Erro no servidor",
        });
    }
};
exports.createComment = createComment;
const getComments = async (req, res) => {
    try {
        const { news_id } = req.query;
        if (!news_id) {
            return res.status(400).json({
                message: "Informe o ID da notícia",
            });
        }
        const [comments] = await database_1.db.query(`
      SELECT 
        comments.id,
        comments.content,
        comments.created_at,
        users.name
      FROM comments
      JOIN users ON users.id = comments.user_id
      WHERE comments.news_id = ?
      ORDER BY comments.created_at DESC
      `, [news_id]);
        return res.status(200).json(comments);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Erro ao buscar comentários",
        });
    }
};
exports.getComments = getComments;
//# sourceMappingURL=comment.controller.js.map