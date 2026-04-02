import { Router } from "express";
import { signUp, signIn } from "../controllers/auth.controller";
import { authMiddleware } from "../middleware/auth.middleware";
import { db } from "../config/database";

const router = Router();

router.post("/sign-up", signUp);
router.post("/sign-in", signIn);


router.get("/profile", authMiddleware, (req, res) => {
  res.json({ message: "Você está logado ✅" });
});







export default router;