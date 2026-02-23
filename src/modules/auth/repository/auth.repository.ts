import { database } from "../../../config/database.config.js";
import type { Usuario } from "../interface.js";

export class AuthRepository {
    public async crearUsuario( data: Usuario ){
        const query = `
            INSERT INTO usuarios (email, usuario, contrasenia)
            VALUES ($1, $2, $3);
        `
        const values = [ data.email, data.usuario, data.contrasenia ]
        return (await database.query(query, values)).rows
    }
}