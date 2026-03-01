import { Router } from "express";
import { CartController } from "./cart.controller.js";
import { AuthMiddleware } from "../../middleware/auth.middleware.js";

export class CartRoutes {
    static get routes(): Router{
        const router = Router()
        const controller = new CartController()

        router.get("/", [ AuthMiddleware.validarJWT ], controller.obtenerProducto )
        router.post("/", [ AuthMiddleware.validarJWT ], controller.agregarProducto )
        router.put("/:id", [ AuthMiddleware.validarJWT ], controller.actualizarProducto )
        router.delete("/:id", [ AuthMiddleware.validarJWT ], controller.eliminarItemID )
        router.delete("/vaciar", [ AuthMiddleware.validarJWT ], controller.eliminarTodoItem )
    
        return router
    }
}