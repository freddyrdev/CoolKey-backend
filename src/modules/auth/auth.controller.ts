import type { Request, Response } from "express";
import { AuthService } from "./auth.service.js";

export class AuthController {
    private readonly servicio: AuthService

    constructor(){
        this.servicio = new AuthService()
    }

    public register = (req: Request, res: Response) => {
        const [error, servicio ] = this.servicio.register()

        if( error ) return res.status(400).json({ error })
        res.json({ servicio })
    }
}