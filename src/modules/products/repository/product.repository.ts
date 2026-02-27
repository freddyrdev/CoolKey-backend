import { database } from "../../../config/database.config.js";
import type { Producto } from "../interface.js";

export class RepoProducto{
    public crearProducto = async(data: Producto) => {
        const query = `
            INSERT INTO productos (nombre, descripcion, precio, imagen_url, categoria, stock)
            VALUES ($1, $2, $3, $4, $5, $6);
        `
        const values = [ 
            data.nombre,
            data.descripcion || null,
            data.precio,
            data.imagen_url || null,
            data.categoria || null,
            data.stock || null
        ]

        return await database.query(query, values)
    }

    public actualizarProducto = async(id: number, data: Producto) => {
        const query = `
            UPDATE productos SET nombre = $1, descripcion = $2, precio = $3, imagen_url = $4, categoria = $5, stock = $6 WHERE id = $7
        `
        const values = [ 
            data.nombre,
            data.descripcion,
            data.precio,
            data.imagen_url,
            data.categoria,
            data.stock,
            id
        ]

        return (await database.query(query, values)).rows
    }
}