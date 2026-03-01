import type { Request, Response } from "express";
import { CartService } from "./cart.service.js";
import type { Usuario } from "../auth/interface.js";
import type { Cart } from "./interface.js";
import { RepoCart } from "./repository/cart.repository.js";

export class CartController {
    private servicio: CartService
    private repoCart: RepoCart

    constructor(){
        this.servicio = new CartService()
        this.repoCart = new RepoCart()
    }

    public obtenerCarrito = async(req: Request, res: Response) => {
        const { id } = req.userContext
        const [ codigo, error, servicio ] = await this.servicio.obtenerCarrito( id )

        if( error ) return res.status( Number(codigo) ).json({ error })
        res.status( Number(codigo) ).json( servicio )
    }

    public agregarCarrito = async(req: Request, res: Response) => {
        const { id } = req.userContext
        const data: Cart = req.body
        const [ codigo, error, servicio ] = await this.servicio.agregarCarrito({ ...data, usuario_id: id })
        
        if( error ) return res.status( Number(codigo) ).json({ error })
        res.status( Number(codigo) ).json( servicio )
    }

    public actualizarCantidad = async(req: Request, res: Response) => {
        const id = +req.params.id!
        const { cantidad } = req.body
        const { id: usuario_id } = req.userContext
        const [ codigo, error, servicio ] = await this.servicio.actualizarCantidad( id, usuario_id, cantidad )

        if( error ) return res.status( Number(codigo) ).json({ error })
        res.status( Number(codigo) ).json( servicio )
    }

    public eliminarItemID = async(req: Request, res: Response) => {
        const id = +req.params.id!
        const { id: usuario_id } = req.userContext
        const [ codigo, error, servicio ] = await this.servicio.eliminarItemID( id, usuario_id )

        if( error ) return res.status( Number(codigo) ).json({ error })
        res.status( Number(codigo) ).json( servicio )
    }

    public eliminarTodoItem = async(req: Request, res: Response) => {
        const { id } = req.userContext
        const [ codigo, error, servicio ] = await this.servicio.eliminarTodoItem( id )
        
        if( error ) return res.status( Number(codigo) ).json({ error })
        res.status( Number(codigo) ).json( servicio )
    }
}