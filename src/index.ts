import { AppRoutes } from "./presentation/routes.js"
import { Server } from "./presentation/server.js"

const main = () => {
    const server = new Server({ port: 3000, routes: AppRoutes.routes })
    server.start()
}

main()