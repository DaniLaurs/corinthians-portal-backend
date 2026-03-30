import { Router } from "express";
import { getStandings } from "../controllers/standings.controller";

const router = Router();

router.get("/", getStandings);

export default router;