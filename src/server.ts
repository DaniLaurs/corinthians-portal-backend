import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { db } from "./config/database";

import authRoutes from "./routes/auth.routes";
import commentRoutes from "./routes/comment.routes";
import newsRoutes from "./routes/news.routes";
import standingsRoutes from "./routes/standings.routes";
import likesRoutes from "./routes/likes.routes";

dotenv.config();
console.log("DATABASE_URL:", process.env.DATABASE_URL);

const app = express();


app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));app.use(express.json());

app.get("/", (req, res) => {
  res.send("API Corinthians Portal funcionando ⚽");
});

app.use("/api/auth", authRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/news", newsRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/standings", standingsRoutes);
app.use("/api/likes", likesRoutes);

const PORT = process.env.PORT || 3000;
console.log("JWT_SECRET:", process.env.JWT_SECRET);

// testar conexão com PostgreSQL
db.connect()
  .then(() => {
    console.log("✅ Banco conectado com sucesso");
  })
  .catch((error) => {
    console.log("❌ Erro ao conectar no banco", error);
  });

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});
