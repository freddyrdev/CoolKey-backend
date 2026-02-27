import { RepoGeneral } from "../repository/general.repository.js"
import type { Producto } from "./interface.js"
import { RepoProducto } from "./repository/product.repository.js"

export class ProductsService{
    private repo: RepoGeneral
    private repoProducto: RepoProducto

    constructor(){
        this.repo = new RepoGeneral("productos")
        this.repoProducto = new RepoProducto()
    }

    public async obtenerProductos(pagina: number, limite: number){
        return [ 200, undefined, await this.repo.obtenerDatos(pagina, limite) ]
    }

    public async obtenerProducto( id: number ){
        if( !id || isNaN(id) ) return [ 400, `El ID ${ id } no es valido` ]

        const consulta = await this.repo.buscarDatoPorID(id)
        if( !consulta ) return [ 404, `No se pudo encontrar el recurso con el ID: ${ id }` ]
        return [ 200, undefined, consulta ]
    }

    public async crearProducto(data: Producto){
        const { nombre, precio } = data

        if( !nombre ) return [ 400, "El nombre es requerido" ]
        if( nombre.length > 150 ) return [ 400, "Nombre invalido por caracteres exesivos" ]
        if( !precio ) return [ 400, "El precio es requerido" ]

        await this.repoProducto.crearProducto( data )
        return [ 201, undefined, { exito: "El producto se ha creado con exito"} ]
    }

    public async editarProducto(id: number, data: Producto){
        if( !id || isNaN(id) ) return [ 400, `El ID ${ id } no es valido` ]
        
        const campos = Object.keys(data)
        if( campos.length === 0 ) return [ "No hay campos a actualizar" ]
        if( data.precio !== undefined && data.precio < 0 ) return [ "Valor invalido" ]
        
        return [ 204, undefined, await this.repoProducto.actualizarProducto(id, data) ]
    }

    public async eliminarProducto(id: number){
        if( !id || isNaN(id) ) return [ 400, `El ID ${ id } no es valido` ]
        const verificacion = await this.repo.buscarDatoPorID(id)
        if( !verificacion ) return [ 404, `No se encontro el ID ${ id }` ]

        return [ 204, undefined, await this.repo.eliminarDatoPorID(id) ]
    }
}