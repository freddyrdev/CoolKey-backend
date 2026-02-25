import express, { Router } from 'express';
import { Database } from '../database/init-db.js';
import cors from 'cors'

interface Opciones {
    port: number,
    routes: Router
}

export class Server{
    private readonly app = express()
    private readonly port: number
    private readonly routes: Router
    private database: Database

    constructor( opciones: Opciones ){
        const { port, routes } = opciones
        this.database = new Database()
        this.port = port
        this.routes = routes
    }
    
    async start(){
        await this.database.iniciar()

        this.app.use(cors({
            origin: 'http://localhost:5173',
            methods: ['GET', 'POST', 'PUT', 'DELETE'],
            allowedHeaders: ['Content-Type', 'Authorization']
        }));

        this.app.use( express.json() ) // Cargar raw
        this.app.use( express.urlencoded({ extended: true }))
        this.app.use( this.routes )

        this.app.listen( this.port, () => {
            console.log(`[SERVER] El servidor esta corriendo en el puerto ${ this.port }`)
        })
    }
}
