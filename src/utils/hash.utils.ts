import bcrypt from "bcrypt"

export class Hash {
    private static saltRounds = Number(15)

    static async hashear( valor: string ){
        if( !valor ) return [ 400, "Valor requerido para el hash" ]
        return [ 200, undefined, await bcrypt.hash(valor, this.saltRounds) ]
    }

    static async comparar( valorPlano: string, hash: string ){
        if( !valorPlano || !hash ) return [ 500, "Datos insuficientes para comprar" ]
        return [ 200, undefined, await bcrypt.compare(valorPlano, hash) ]
    }
}