import format from "pg-format";
import { database } from "../../../config/database.config.js";
import type { Usuario } from "../interface.js";

export class AuthRepository {
    public async crearUsuario( data: Usuario ){
        const query = `
            INSERT INTO usuarios (email, usuario, contrasenia)
            VALUES ($1, $2, $3)
            RETURNING *;
        `
        const values = [ data.email, data.usuario, data.contrasenia ]
        return (await database.query(query, values)).rows
    }

    public async buscarPorUnDato( data: Usuario ){
        const { id = null, email = null, usuario = null } = data
        const query = `
            SELECT id, email, usuario, contrasenia FROM usuarios WHERE id = $1 OR email = $2 OR usuario = $3 LIMIT 1
        `
        const values = [ id, email, usuario ]
        return (await database.query(query, values)).rows[0]
    }

    public async buscarPorId(id: number){
        const query = `
            SELECT id, email, usuario, foto_perfil FROM usuarios WHERE id = $1
        `
        const values = [ id ]
        return (await database.query(query, values)).rows[0]
    }

    public async subirImagen( foto_perfil: any, id: number ){
        const query = `
            UPDATE usuarios SET foto_perfil = $1 WHERE id = $2
        `
        const values = [ foto_perfil, id ]
        
        return await database.query(query, values)
    }
}