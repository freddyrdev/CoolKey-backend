import { Router } from "express";
import { PedidosController } from "./pedidos.controller.js";
import { AuthMiddleware } from "../../middleware/auth.middleware.js";

export class PedidosRoutes {
    static get routes(): Router {
        const router = Router()
        const controller = new PedidosController()

        router.put("/", [ AuthMiddleware.validarJWT ], controller.crearPedido )
        return router
    }
}