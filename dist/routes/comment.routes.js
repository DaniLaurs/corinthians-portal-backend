"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const comment_controller_1 = require("../controllers/comment.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = (0, express_1.Router)();
router.post("/", auth_middleware_1.authMiddleware, comment_controller_1.createComment);
router.get("/", comment_controller_1.getComments);
exports.default = router;
//# sourceMappingURL=comment.routes.js.map