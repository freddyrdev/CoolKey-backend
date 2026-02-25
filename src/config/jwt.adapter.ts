import jwt from "jsonwebtoken"
import { configEnv } from "./env.config.js"

const SEED = configEnv.JWT_SEED

export class JWTAdapter {
    static async generateToken( payload: any, duracion: string = "2h" ){
        return new Promise((resolve) => {
            jwt.sign(payload, SEED, { expiresIn: duracion as any }, (err, token) => {
                if( err ) return resolve(null)
                resolve(token!)
            })
        })
    }

    static validarToken<T>(token: string): Promise<T | null> {
        return new Promise((resolve) => {
            jwt.verify(token, SEED, (err, decoded) => {
                if (err) return resolve(null);
                resolve(decoded as T);
            });
        });
    }
}