import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "supersecret";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;

    console.log("HEADER:", authHeader); // 👈 já tinha

    if (!authHeader) {
      return res.status(401).json({
        message: "Token não enviado",
      });
    }

    const token = authHeader.split(" ")[1];

    console.log("TOKEN:", token); // 👈 NOVO

    const decoded = jwt.verify(token, JWT_SECRET);

    console.log("DECODED:", decoded); // 👈 MAIS IMPORTANTE

    (req as any).user = decoded;

    next();
  } catch (error) {
    console.log("ERRO JWT:", error); // 👈 ESSENCIAL

    return res.status(401).json({
      message: "Token inválido",
    });
  }
};