import { RepoCart } from "../cart/repository/cart.repository.js"
import { RepoPedidos } from "./repository/pedidos.repository.js"

export class PedidosService {
    private repoCart: RepoCart
    private repoPedidos: RepoPedidos

    constructor(){
        this.repoCart = new RepoCart
        this.repoPedidos = new RepoPedidos
    }
    
    public realizarPedido = async( usuario_id: number ) => {
        const itemsCarrito = await this.repoCart.obtenerCarrito( usuario_id )
        if( itemsCarrito.length === 0 ) return [ 400, "El carrito esta vacio" ]

        const total = itemsCarrito.reduce((acc, item) => acc + parseFloat(item.subtotal), 0)
        const resultado = await this.repoPedidos.transaccionPedido( usuario_id, total )

        return [ 201, undefined, resultado ]
    }
}