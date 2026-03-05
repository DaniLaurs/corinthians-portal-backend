"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const database_1 = require("./config/database");
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const comment_routes_1 = __importDefault(require("./routes/comment.routes"));
const news_routes_1 = __importDefault(require("./routes/news.routes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.get("/", (req, res) => {
    res.send("API Corinthians Portal funcionando ⚽");
});
app.use("/api/auth", auth_routes_1.default);
app.use("/api/comments", comment_routes_1.default);
app.use("/api/news", news_routes_1.default);
// PORT dinâmica para deploy
const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
    try {
        const connection = await database_1.db.getConnection();
        console.log("✅ Banco conectado com sucesso");
        connection.release();
    }
    catch (error) {
        console.log("❌ Erro ao conectar no banco", error);
    }
    console.log(`🚀 Servidor rodando na porta ${PORT}`);
});
//# sourceMappingURL=server.js.map