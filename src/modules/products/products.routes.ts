import { Router } from "express";
import { ProductsController } from "./products.controller.js";

export class ProductsRoutes {
    static get routes(): Router {
        const router = Router()
        const controller = new ProductsController()

        // TODO: Poner los middlewares en las rutas post / put / delete
        router.get("/", controller.obtenerProductos )
        router.get("/:id", controller.obtenerProducto )
        router.post("/", controller.crearProducto )
        router.put("/:id", controller.editarProducto )
        router.delete("/:id", controller.eliminarProducto )

        return router
    }
}