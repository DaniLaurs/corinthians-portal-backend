import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

// 🔥 PEGA DO .ENV
const JWT_SECRET = process.env.JWT_SECRET as string;

// 🔥 VERIFICA SE EXISTE
if (!JWT_SECRET) {
  throw new Error("JWT_SECRET não definido!");
}

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log("🛡️ MIDDLEWARE BATENDO AQUI");

    const authHeader = req.headers.authorization;

    console.log("🔐 AUTH HEADER:", authHeader);
    console.log("🔑 JWT_SECRET:", JWT_SECRET);

    // 🔥 SEM HEADER
    if (!authHeader) {
      console.log("❌ NÃO TEM HEADER");

      return res.status(401).json({
        message: "Token não enviado",
      });
    }

    // 🔥 FORMATO INVÁLIDO
    if (!authHeader.startsWith("Bearer ")) {
      console.log("❌ FORMATO INVÁLIDO:", authHeader);

      return res.status(401).json({
        message: "Formato do token inválido",
      });
    }

    // 🔥 PEGA TOKEN
    const token = authHeader.split(" ")[1];

    console.log("🎟️ TOKEN EXTRAÍDO:", token);

    // 🔥 TOKEN VAZIO
    if (!token) {
      console.log("❌ TOKEN VAZIO");

      return res.status(401).json({
        message: "Token não encontrado",
      });
    }

    // 🔥 VERIFICA TOKEN
    const decoded = jwt.verify(token, JWT_SECRET);

    console.log("✅ TOKEN VÁLIDO");
    console.log("👤 DECODED:", decoded);

    // 🔥 SALVA USER
    (req as any).user = decoded;

    next();

  } catch (error) {
    console.log("🚨 ERRO JWT:", error);

    return res.status(401).json({
      message: "Token inválido",
    });
  }
};