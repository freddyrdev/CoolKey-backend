import { JWTAdapter } from "../../config/jwt.adapter.js";
import { regulatExps } from "../../config/regular-exp.js";
import { Hash } from "../../utils/hash.utils.js";
import type { Usuario } from "./interface.js";
import { AuthRepository } from "./repository/auth.repository.js";

export class AuthService{
    private readonly repoAuth: AuthRepository

    constructor(){
        this.repoAuth = new AuthRepository()
    }

    public async register( data: Usuario ){
        if ( !data || Object.keys(data).length === 0 ) return [ 400, "El cuerpo de la petición está vacío" ];
        const { email, contrasenia, usuario } = data

        if( !email ) return [ 400, "El email es requerido" ]
        if( !regulatExps.email.test(email.trim()) ) return [ 400, "El formato del email es invalido" ]
        if( !usuario ) return [ 400, "El usuario es requerido" ]
        if( !contrasenia ) return [ 400, "La contraseña es requerida" ]
        if( !contrasenia || contrasenia.length < 6  ) return [ 400, "La contraseña debe tener 6 caracteres" ]

        const usuarioExistente = await this.repoAuth.buscarPorUnDato({ email, usuario })
        if( usuarioExistente ) return [ 400, `El usuario ya existe` ]

        const [ codigo, error, contraseniaHash ] = await Hash.hashear( contrasenia )
        if( error ) return [ codigo, error ]
        if( typeof contraseniaHash !== "string" ) return [ 500, "Error interno al crear la contraseña" ] 

        const fila = await this.repoAuth.crearUsuario({ contrasenia: contraseniaHash , email, usuario })
        const usuarioCreado = fila[0] as Usuario | undefined
        if( !usuarioCreado ) return [ 500, `Error al obtener el usuario creado` ]

        const tokenSesion = await JWTAdapter.generateToken({ 
            id: usuarioCreado.id, 
            email: usuarioCreado.email, 
            usuario: usuarioCreado.usuario 
        })

        return [ 201, undefined, { 
            message: "Cuenta creada con exito.", 
            usuario: { 
                id: usuarioCreado.id, 
                email: usuarioCreado.email, 
                usuario: usuarioCreado.usuario 
            }, token: tokenSesion } 
        ]
    }

    public async login( data: Usuario ){
        if ( !data || Object.keys(data).length === 0 ) return [ 400, "El cuerpo de la petición está vacío" ];
        const { usuario, email, contrasenia } = data

        if( !usuario && !email ) return [ 400, "El nombre o el correo es requerido" ]
        if( !contrasenia ) return [ 400, "La contraseña es requerida" ]

        const usuarioRegistrado: Usuario = await this.repoAuth.buscarPorUnDato({ email, usuario })
        if( !usuarioRegistrado ) return [ 400, "Credenciales incorrectas" ]
        if( !usuarioRegistrado.contrasenia ) return [ 400, "La contraseña es invalida" ]
        
        const comparacionHash = await Hash.comparar(contrasenia, usuarioRegistrado.contrasenia)
        if( !comparacionHash[2] ) return [ 400, "La contraseña es invalida" ]

        const token = await JWTAdapter.generateToken({ id: usuarioRegistrado.id, email: usuarioRegistrado.email, usuario: usuarioRegistrado.usuario })
        if( !token ) return [ 500, "No se pudo generar el token" ]

        return [ 200, undefined, { usuario: { id: usuarioRegistrado.id, email: usuarioRegistrado.email, usuario: usuarioRegistrado.usuario }, token }]
    }

    public async perfil( id: number | null ){
        if( !id ) return [ 400, `El ID ${ id } es invalido` ]

        const usuario = await this.repoAuth.buscarPorId( id )
        if( !usuario ) return [ 404, "El usuario no fue encontrado" ]
        
        return [ 200, undefined, usuario ]
    }

    public async perfilImg( url: any, data: Usuario ){
        if( !url ) return [ 400, "No se pudo subir la imagen" ]
        
        const { id } = data
        if( !id ) return [ 400, `No se encontro el ID ${ id }` ]

        await this.repoAuth.subirImagen(url, id)
        return [ 200, undefined, { message: "Foto actualizada", url } ]
    }
}