import express, { Router } from 'express';
interface Opciones {
    port: number,
    routes: Router
}

export class Server{
    private readonly app = express()
    private readonly port: number
    private readonly routes: Router

    constructor( opciones: Opciones ){
        const { port, routes } = opciones
        this.port = port
        this.routes = routes
    }
    
    async start(){
        this.app.use( express.json() ) // Cargar raw
        this.app.use( express.urlencoded({ extended: true }))
        this.app.use( this.routes )

        this.app.listen( this.port, () => {
            console.log(`[SERVER] El servidor esta corriendo en el puerto ${ this.port }`)
        })
    }
}
