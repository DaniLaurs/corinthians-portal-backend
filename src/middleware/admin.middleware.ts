import { Request, Response, NextFunction } from "express";

export const adminMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("USER:", (req as any).user);

  const user = (req as any).user;

  if (!user) {
    return res.status(401).json({
      message: "Usuário não autenticado",
    });
  }

  if (user.role !== "admin") {
    return res.status(403).json({
      message: "Acesso permitido apenas para administradores",
    });
  }

  next();
};