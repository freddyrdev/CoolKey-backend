import { Router } from "express";
import { AuthRoutes } from "../modules/auth/auth.routes.js";
import { ProductsRoutes } from "../modules/products/products.routes.js";

export class AppRoutes {
    static get routes(): Router {
        const router = Router()
        
        router.use("/api/auth", AuthRoutes.routes )
        router.use("/api/productos", ProductsRoutes.routes )

        return router
    }
}