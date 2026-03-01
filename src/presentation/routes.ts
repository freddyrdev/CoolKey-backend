import { Router } from "express";
import { AuthRoutes } from "../modules/auth/auth.routes.js";
import { ProductsRoutes } from "../modules/products/products.routes.js";
import { CartRoutes } from "../modules/cart/cart.routes.js";
import { PedidosRoutes } from "../modules/pedidos/pedidos.routes.js";

export class AppRoutes {
    static get routes(): Router {
        const router = Router()
        
        router.use("/api/auth", AuthRoutes.routes )
        router.use("/api/productos", ProductsRoutes.routes )
        router.use("/api/carrito", CartRoutes.routes )
        router.use("/api/pedidos", PedidosRoutes.routes )

        return router
    }
}