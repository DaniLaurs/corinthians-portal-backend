import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { db } from "./config/database";
import authRoutes from "./routes/auth.routes";
import commentRoutes from "./routes/comment.routes";
import newsRoutes from "./routes/news.routes";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API Corinthians Portal funcionando ⚽");
});

app.use("/api/auth", authRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/news", newsRoutes);

// PORT dinâmica para deploy
const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
  try {
    const connection = await db.getConnection();
    console.log("✅ Banco conectado com sucesso");
    connection.release();
  } catch (error) {
    console.log("❌ Erro ao conectar no banco", error);
  }

  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});