import { RepoGeneral } from "../repository/general.repository.js"
import type { Cart } from "./interface.js"
import { RepoCart } from "./repository/cart.repository.js"

export class CartService {
    private repo: RepoGeneral
    private repoCart: RepoCart

    constructor(){
        this.repo = new RepoGeneral("carrito")
        this.repoCart = new RepoCart()
    }

    public obtenerCarrito = async( usuario_id: number ) => {
        const items = await this.repoCart.obtenerCarrito( usuario_id )
        const totalCompra = items.reduce((acc, item) => acc + parseFloat(item.subtotal), 0)
        return [ 200, undefined, { productos: items, totalCompra } ]
    }
    
    public agregarCarrito = async( data: Cart ) => {
        return [ 200, undefined, await this.repoCart.AgregarCarrito( data ) ]
    }

    public actualizarCantidad = async( id: number, usuario_id: number, nuevaCantidad: number ) => {
        if( !nuevaCantidad || isNaN(nuevaCantidad) ) return [ 400, "La cantidad enviada es invalida" ]
        if( !id || isNaN(id) ) return [ 400, `El ID ${ id } es invalido` ]
        if( !usuario_id || isNaN(usuario_id) ) return [ 404, `No se encontro el usuario solicitado` ]

        return [ 200, undefined, await this.repoCart.actualizarCarrito(id, usuario_id, nuevaCantidad) ]
    }

    public eliminarItemID = async( id: number, usuario_id: number ) => {
        return [ 200, undefined, await this.repoCart.eliminarItemID( id, usuario_id ) ]
    }

    public eliminarTodoItem = async( usuario_id: number ) => {
        return [ 200, undefined, await this.repoCart.eliminarTodoItem( usuario_id ) ]
    }
}