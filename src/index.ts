import { configEnv } from "./config/config.env.js"
import { AppRoutes } from "./presentation/routes.js"
import { Server } from "./presentation/server.js"

const main = () => {
    const server = new Server({ port: configEnv.PORT, routes: AppRoutes.routes })
    server.start()
}

main()