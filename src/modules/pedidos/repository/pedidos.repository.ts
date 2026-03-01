import { database } from "../../../config/database.config.js"

export class RepoPedidos {
    public async transaccionPedido(usuario_id: number, total: number){
        try{
            const queryPedido = `
                INSERT INTO pedidos (usuario_id, total, estado)
                VALUES ($1, $2, 'pendiente')
                RETURNING id;
            `
            const valuesPedidos = [ usuario_id, total ]
            const pedido_id = (await database.query(queryPedido, valuesPedidos)).rows[0].id

            // mover del carrito al detalle_pedidos
            const queryDetalle = `
                INSERT INTO detalle_pedido (pedido_id, producto_id, cantidad, precio_unitario, color_elegido, texto_elegido)
                SELECT $1, c.producto_id, c.cantidad, p.precio, c.color_llavero, c.texto_personalizado
                FROM carrito c
                JOIN productos p ON c.producto_id = p.id
                WHERE c.usuario_id = $2
            `

            const valuesDetalle = [ pedido_id, usuario_id ]
            await database.query(queryDetalle, valuesDetalle)

            await database.query("DELETE FROM carrito WHERE usuario_id = $1", [ usuario_id ])
            await database.query("COMMIT")
            return { pedido_id, mensaje: "Pedido realizado con exito" }
        }catch (err: any){
            await database.query("ROLLBACK")
            throw err
        }
    }
}