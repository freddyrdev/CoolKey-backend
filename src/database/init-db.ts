import { database } from "../config/database.config.js"

/*
    DROP TABLE IF EXISTS detalle_pedido CASCADE;
    DROP TABLE IF EXISTS pedidos CASCADE;
    DROP TABLE IF EXISTS productos CASCADE;
    DROP TABLE IF EXISTS favoritos CASCADE;
    DROP TABLE IF EXISTS usuarios CASCADE;
*/

export class Database{
    private tabla: string

    constructor(){
        this.tabla = `
            CREATE TABLE IF NOT EXISTS usuarios (
                id SERIAL PRIMARY KEY,
                email VARCHAR(100) UNIQUE NOT NULL,
                usuario VARCHAR(100) NOT NULL,
                contrasenia VARCHAR(100) NOT NULL,
                foto_perfil VARCHAR(225),
                fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );

            CREATE TABLE IF NOT EXISTS productos (
                id SERIAL PRIMARY KEY,
                nombre VARCHAR(150) NOT NULL,
                descripcion TEXT,
                precio DECIMAL(10,2) NOT NULL,
                imagen_url TEXT,
                categoria VARCHAR(100),
                stock INT DEFAULT 0,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );

            CREATE TABLE IF NOT EXISTS favoritos (
                id SERIAL PRIMARY KEY,
                usuario_id INT REFERENCES usuarios(id) ON DELETE CASCADE,
                producto_id INT REFERENCES productos(id) ON DELETE CASCADE,
                fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                UNIQUE(usuario_id, producto_id)
            );

            CREATE TABLE IF NOT EXISTS pedidos (
                id SERIAL PRIMARY KEY,
                usuario_id INT REFERENCES usuarios(id) ON DELETE CASCADE,
                total NUMERIC(10,2) NOT NULL,
                estado VARCHAR(50) DEFAULT 'pendiente',
                fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );

            CREATE TABLE IF NOT EXISTS detalle_pedido (
                id SERIAL PRIMARY KEY,
                pedido_id INT REFERENCES pedidos(id) ON DELETE CASCADE,
                producto_id INT REFERENCES productos(id),
                cantidad INT NOT NULL,
                precio_unitario NUMERIC(10,2) NOT NULL
            );
        `
    }

    public async iniciar(){
        try{
            await database.query(this.tabla)
            console.log("[DATABASE] La base de datos se ha iniciado exitosamente.")
        }catch (error: any){
            throw new Error(`Error al crear las tablas: ${ error }`)
        }
    }
}