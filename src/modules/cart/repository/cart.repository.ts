import { database } from "../../../config/database.config.js"
import type { Cart } from "../interface.js"

export class RepoCart {
    public async AgregarCarrito(data: Cart){
        const query = `
            INSERT INTO carrito (
                usuario_id, 
                producto_id, 
                cantidad, 
                color_llavero, 
                texto_personalizado
            )
            VALUES ($1, $2, $3, $4, $5)
            ON CONFLICT ON CONSTRAINT unique_product_selection
            DO UPDATE SET cantidad = carrito.cantidad + EXCLUDED.cantidad
            RETURNING *;
        `
        const values = [
            data.usuario_id,
            data.producto_id,
            data.cantidad,
            data.color_llavero,
            data.texto_personalizado
        ]

        return (await database.query(query, values)).rows[0]
    }

    public async obtenerCarrito(usuario_id: number){
        const query = `
            SELECT
                c.id,
                p.nombre,
                p.precio,
                c.cantidad,
                c,color_llavero,
                c.personalizacion,
                (p.precio * c.cantidad) AS subtotal
            FROM carrito c
            JOIN productos p ON c.producto_id = p.id
            WHERE c.usuario_id = $1
        `
        return (await database.query(query, [ usuario_id ])).rows
    }

    public async actualizarCarrito( id: number, usuario_id: number, nuevaCantidad: number ){
        const query = `
            UPDATE carrito
            SET cantidad = $1
            WHERE id = $2 AND usuario_id = $3
            RETURNING *;
        `
        const values = [ nuevaCantidad, id, usuario_id ]
        return (await database.query(query, values)).rows[0]
    }

    public async eliminarItemID( id: number, usuario_id: number){
        const query = `
            DELETE FROM carrito
            WHERE id = $1 AND usuario_id = $2
            RETURNING id;
        `
        const values = [ id, usuario_id ]
        return (await database.query(query, values)).rows[0]
    }

    public async eliminarTodoItem( usuario_id: number ){
        const query = `
            DELETE FROM carrito
            WHERE usuario_id = $1;
        `
        await database.query(query, [ usuario_id ])
        return { mensaje: "Carrito vaciado con exito." }
    }
}