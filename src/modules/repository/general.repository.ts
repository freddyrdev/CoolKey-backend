import format from "pg-format";
import { database } from "../../config/database.config.js";

export class RepoGeneral{
    constructor( private tabla: string){}

    public async obtenerDatos(pagina: number = 1, limite: number = 10){
        const offset = (pagina - 1) * limite

        const queryDatos = format(`
            SELECT * FROM %I
            ORDER BY id ASC
            LIMIT %L OFFSET %L
        `, this.tabla, limite, offset)

        const queryTotal = format(`SELECT COUNT(*) as total FROM %I`, this.tabla)
        const [ datos, totalRes ] = await Promise.all([ database.query(queryDatos), database.query(queryTotal)])
        const totalItems = parseInt(totalRes.rows[0].total)

        return {
            productos: datos.rows,
            meta: {
                totalItems,
                totalPaginas: Math.ceil(totalItems / limite),
                paginaActual: pagina,
                porPagina: limite
            }
        };
    }

    public async buscarDatoPorID(id: number){
        const query = format(`
            SELECT * FROM %I WHERE id = %L
        `, this.tabla, id)

        return (await database.query(query)).rows[0]
    }

    public async eliminarDatoPorID(id: number){
        const query = format(`
            DELETE FROM %I WHERE id = %L
        `, this.tabla, id)

        return await database.query(query)
    }
}