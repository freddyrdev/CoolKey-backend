import { Hash } from "../../utils/hash.utils.js";
import type { Usuario } from "./interface.js";
import { AuthRepository } from "./repository/auth.repository.js";

export class AuthService{
    private readonly repoAuth: AuthRepository

    constructor(){
        this.repoAuth = new AuthRepository()
    }

    public async register( data: Usuario ){
        const { email, contrasenia, usuario } = data
        if( !email ) return [ 400, "El email es requerido" ]
        if( !usuario ) return [ 400, "El usuario es requerido" ]
        if( !contrasenia ) return [ 400, "La contraña es requerida" ]
        if( !contrasenia || contrasenia.length < 6  ) return [ 400, "La contraseña debe tener 6 caracteres" ]

        try{
            const [ codigo, error, contraseniaHash ] = await Hash.hashear( contrasenia )
            if( error ) return [ codigo, error ]
            if( typeof contraseniaHash !== "string" ) return [ 500, "Error interno al crear la contraseña" ] 

            const usuarioCreado = await this.repoAuth.crearUsuario({ contrasenia: contraseniaHash , email, usuario })

            if( !usuarioCreado || usuarioCreado.length === 0 ){
                return [ 400, "Error al crear el usuario en la base de datos" ]
            }
        }catch (error: any){
            return [ 500, `Error interno al crear la cuenta ${ error }` ]
        }

        return [ 201, undefined, { "exito": "Cuenta creada con exito." } ]
    }
}