"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminMiddleware = void 0;
const adminMiddleware = (req, res, next) => {
    const user = req.user;
    if (!user || user.role !== "admin") {
        return res.status(403).json({
            message: "Acesso permitido apenas para administradores",
        });
    }
    next();
};
exports.adminMiddleware = adminMiddleware;
//# sourceMappingURL=admin.middleware.js.map