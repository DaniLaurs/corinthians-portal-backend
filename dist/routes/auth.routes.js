"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("../controllers/auth.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = (0, express_1.Router)();
router.post("/sign-up", auth_controller_1.signUp);
router.post("/sign-in", auth_controller_1.signIn);
router.get("/profile", auth_middleware_1.authMiddleware, (req, res) => {
    res.json({ message: "Você está logado ✅" });
});
exports.default = router;
//# sourceMappingURL=auth.routes.js.map