"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const admin_middleware_1 = require("../middleware/admin.middleware");
const auth_middleware_1 = require("../middleware/auth.middleware");
const news_controller_1 = require("../controllers/news.controller");
const router = (0, express_1.Router)();
router.post("/", auth_middleware_1.authMiddleware, admin_middleware_1.adminMiddleware, news_controller_1.createNews);
router.get("/", news_controller_1.getAllNews);
router.get("/:id", news_controller_1.getNewsById);
router.delete("/:id", auth_middleware_1.authMiddleware, admin_middleware_1.adminMiddleware, news_controller_1.deleteNews);
exports.default = router;
//# sourceMappingURL=news.routes.js.map