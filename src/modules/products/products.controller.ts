import type { Request, Response } from "express";
import { ProductsService } from "./products.service.js";

export class ProductsController{
    private servicio: ProductsService

    constructor(){
        this.servicio = new ProductsService()
    }

    public obtenerProductos = async(req: Request, res: Response) => {
        const pagina = Math.max(1, parseInt(req.query.pagina as string) || 1)
        const limite = Math.min(100, parseInt(req.query.limite as string) || 10)
        const [ codigo, error, servicio ] = await this.servicio.obtenerProductos(pagina, limite)

        if( error ) return res.status( Number(codigo) ).json({ error })
        res.status( Number(codigo) ).json( servicio )
    }

    public obtenerProducto = async(req: Request, res: Response) => {
        const id = +req.params.id!
        const [ codigo, error, servicio ] = await this.servicio.obtenerProducto(id)
        if( error ) return res.status( Number(codigo) ).json({ error })
        res.status( Number(codigo) ).json( servicio )
    }

    public crearProducto = async(req: Request, res: Response) => {
        const data = req.body
        const [ codigo, error, servicio ] = await this.servicio.crearProducto( data )
        if( error ) return res.status( Number(codigo) ).json({ error })
        res.status( Number(codigo) ).json( servicio )
    }

    public editarProducto = async(req: Request, res: Response) => {
        const id = +req.params.id!
        const data = req.body
        const [ codigo, error, servicio ] = await this.servicio.editarProducto( id, data )
        if( error ) return res.status( Number(codigo) ).json({ error })
        res.status( Number(codigo) ).json( servicio )
    }

    public eliminarProducto = async(req: Request, res: Response) => {
        const id = +req.params.id!
        const [ codigo, error, servicio ] = await this.servicio.eliminarProducto( id )
        if( error ) return res.status( Number(codigo) ).json({ error })
        res.status( Number(codigo) ).json(servicio)
    }
}