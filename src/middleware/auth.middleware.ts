import type { NextFunction, Request, Response } from "express"
import { JWTAdapter } from "../config/jwt.adapter.js"
import { platform } from "node:os"


export class AuthMiddleware {
    static async validarJWT( req: Request, res: Response, next: NextFunction ){
        const autorisacion = req.header('Authorization')
        if( !autorisacion ) return res.status(401).json({ error: "No hay ningun token verificado" })
        if( !autorisacion.startsWith("Bearer ") ) return res.status(401).json({ error: "token 'Bearer' no valido" })
        
        const token = autorisacion.split(" ").at(1) || ''

        try {
            const payload = await JWTAdapter.validarToken<{token: string}>(token)
            if( !payload ) return res.status(401).json({ error: "Token invalido" })
            
            req.userContext = payload

            next()
        } catch (error) {
            console.log(error)
            res.status(500).json({ error: "Error interno del servidor" })
        }
    }
}