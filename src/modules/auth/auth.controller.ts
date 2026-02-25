import type { Request, Response } from "express";
import { AuthService } from "./auth.service.js";
import type { Usuario } from "./interface.js";

export class AuthController {
    private readonly servicio: AuthService

    constructor(){
        this.servicio = new AuthService()
    }

    public register = async(req: Request, res: Response) => {
        const data: Usuario = req.body
        const [ codigo, error, servicio ] = await this.servicio.register( data )

        if( error ) return res.status( Number(codigo) ).json({ error })
        res.status( Number(codigo) ).json( servicio )
    }

    public login = async(req: Request, res: Response) => {
        const data: Usuario = req.body
        const [ codigo, error, servicio ] = await this.servicio.login( data )

        if( error ) return res.status( Number(codigo) ).json({ error })
        res.status( Number(codigo) ).json( servicio )
    }
}