"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteNews = exports.getNewsById = exports.getAllNews = exports.createNews = void 0;
const database_1 = require("../config/database");
const createNews = async (req, res) => {
    try {
        const { title, content, image_url } = req.body;
        if (!title || !content) {
            return res.status(400).json({
                message: "Título e conteúdo são obrigatórios",
            });
        }
        await database_1.db.query("INSERT INTO news (title, content, image_url) VALUES (?, ?, ?)", [title, content, image_url || null]);
        return res.status(201).json({
            message: "Notícia criada com sucesso ⚽",
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Erro no servidor",
        });
    }
};
exports.createNews = createNews;
const getAllNews = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 5;
        const offset = (page - 1) * limit;
        const [news] = await database_1.db.query("SELECT * FROM news ORDER BY created_at DESC LIMIT ? OFFSET ?", [limit, offset]);
        const [totalResult] = await database_1.db.query("SELECT COUNT(*) as total FROM news");
        const total = totalResult[0].total;
        const totalPages = Math.ceil(total / limit);
        return res.status(200).json({
            page,
            totalPages,
            totalItems: total,
            data: news,
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Erro no servidor",
        });
    }
};
exports.getAllNews = getAllNews;
const getNewsById = async (req, res) => {
    try {
        const { id } = req.params;
        const [rows] = await database_1.db.query("SELECT * FROM news WHERE id = ?", [id]);
        if (rows.length === 0) {
            return res.status(404).json({
                message: "Notícia não encontrada",
            });
        }
        return res.status(200).json(rows[0]);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Erro ao buscar notícia",
        });
    }
};
exports.getNewsById = getNewsById;
const deleteNews = async (req, res) => {
    try {
        const { id } = req.params;
        await database_1.db.query("DELETE FROM news WHERE id = ?", [id]);
        return res.status(200).json({
            message: "Notícia deletada com sucesso",
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Erro ao deletar notícia",
        });
    }
};
exports.deleteNews = deleteNews;
//# sourceMappingURL=news.controller.js.map