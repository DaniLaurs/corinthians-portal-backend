"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signIn = exports.signUp = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const database_1 = require("../config/database");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const signUp = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({
                message: "Preencha todos os campos",
            });
        }
        // verificar se usuário já existe
        const [existingUser] = await database_1.db.query("SELECT id FROM users WHERE email = ?", [email]);
        if (existingUser.length > 0) {
            return res.status(409).json({
                message: "Usuário já cadastrado",
            });
        }
        const hashedPassword = await bcryptjs_1.default.hash(password, 10);
        await database_1.db.query("INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)", [name, email, hashedPassword, "user"]);
        return res.status(201).json({
            message: "Usuário criado com sucesso ⚽",
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Erro no servidor",
        });
    }
};
exports.signUp = signUp;
const signIn = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                message: "Preencha todos os campos",
            });
        }
        const [rows] = await database_1.db.query("SELECT * FROM users WHERE email = ?", [email]);
        if (rows.length === 0) {
            return res.status(400).json({
                message: "Usuário não encontrado",
            });
        }
        const user = rows[0];
        const passwordMatch = await bcryptjs_1.default.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(400).json({
                message: "Senha inválida",
            });
        }
        const token = jsonwebtoken_1.default.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1d" });
        return res.status(200).json({
            message: "Login realizado com sucesso ⚽",
            token,
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Erro no servidor",
        });
    }
};
exports.signIn = signIn;
//# sourceMappingURL=auth.controller.js.map