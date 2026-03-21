import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { db } from "../config/database";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "supersecret";

export const signUp = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Preencha todos os campos",
      });
    }

    const result = await db.query(
      "SELECT id FROM users WHERE email = $1",
      [email]
    );

    if (result.rows.length > 0) {
      return res.status(409).json({
        message: "Usuário já cadastrado",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await db.query(
      "INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, $4)",
      [name, email, hashedPassword, "user"]
    );

    return res.status(201).json({
      message: "Usuário criado com sucesso ⚽",
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Erro no servidor",
    });
  }
};

export const signIn = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Preencha todos os campos",
      });
    }

    const result = await db.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    if (result.rows.length === 0) {
      return res.status(400).json({
        message: "Usuário não encontrado",
      });
    }

    const user = result.rows[0];

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(400).json({
        message: "Senha inválida",
      });
    }

    const token = jwt.sign(
      { id: user.id, role: user.role },
      JWT_SECRET,
      { expiresIn: "1d" }
    );

    return res.status(200).json({
      message: "Login realizado com sucesso ⚽",
      token,
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Erro no servidor",
    });
  }
};