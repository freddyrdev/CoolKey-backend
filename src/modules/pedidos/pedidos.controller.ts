import type { Request, Response } from "express"
import { PedidosService } from "./pedidos.service.js"

export class PedidosController {
    private servicio: PedidosService

    constructor(){
        this.servicio = new PedidosService
    }

    public crearPedido = async(req: Request, res: Response) => {
        const { id } = req.userContext
        const [ codigo, error, servicio ] = await this.servicio.realizarPedido( id )
        if( error ) return res.status( Number(codigo) ).json({ error })
        return res.status( Number(codigo) ).json( servicio )
    }
}