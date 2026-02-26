import { Router } from "express";
import { AuthController } from "./auth.controller.js";
import { AuthMiddleware } from "../../middleware/auth.middleware.js";
import { uploadCloud } from "../../config/cloudinary.js";

export class AuthRoutes {
    static get routes(): Router {
        const router = Router()
        const controller: AuthController = new AuthController()

        router.post("/register", controller.register )
        router.post("/login", controller.login )
        router.get("/perfil", [ AuthMiddleware.validarJWT ], controller.perfil )
        router.post("/perfil/img", [ AuthMiddleware.validarJWT, uploadCloud.single('perfil') ], controller.perfilImg)

        return router
    }
}