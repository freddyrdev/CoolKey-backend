import { database } from "../config/database.config.js"

/*
    Cada modificacion que se aga en modo de desarrollo
    y no sea importante se ejecutara estas lineas para
    facilitar los cambios de las tablas SQL

    DROP TABLE IF EXISTS detalle_pedido CASCADE;
    DROP TABLE IF EXISTS pedidos CASCADE;
    DROP TABLE IF EXISTS productos CASCADE;
    DROP TABLE IF EXISTS favoritos CASCADE;
    DROP TABLE IF EXISTS usuarios CASCADE;
    DROP TABLE IF EXISTS carrito CASCADE;
*/

export class Database{
    private tabla: string
    private productoSEED: any

    constructor(){
        // Cada vez que ocurra una modificacion se debe
        // agregar el SQL original en la carpeta migraciones
        // y pausar el servidor asi no ocurriran errores futuros

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

            CREATE TABLE IF NOT EXISTS carrito (
                id SERIAL PRIMARY KEY,
                usuario_id INT REFERENCES usuarios(id) ON DELETE CASCADE,
                producto_id INT REFERENCES productos(id) ON DELETE CASCADE,
                cantidad INT NOT NULL DEFAULT 1,
                color_llavero VARCHAR(50) NOT NULL DEFAULT '',
                texto_personalizado TEXT NOT NULL DEFAULT '',
                imagen_personalizada_url TEXT,
                fecha_agregado TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                CONSTRAINT unique_product_selection UNIQUE (
                    usuario_id, 
                    producto_id, 
                    color_llavero, 
                    texto_personalizado
                )
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
                precio_unitario NUMERIC(10,2) NOT NULL,
                color_elegido VARCHAR(50),
                texto_elegido TEXT,
                url_conjunto TEXT
            );
        `
        this.productoSEED = [
        {
            nombre: 'Llavero de Resina Galaxia',
            descripcion: 'Llavero personalizado con colores cósmicos y glitter.',
            precio: 150.00,
            imagen_url: 'https://ejemplo.com/foto1.jpg',
            categoria: 'Llaveros',
            stock: 20
        },
        {
            nombre: 'Llavero Inicial Floral',
            descripcion: 'Inicial transparente con flores secas reales dentro.',
            precio: 120.50,
            imagen_url: 'https://ejemplo.com/foto2.jpg',
            categoria: 'Llaveros',
            stock: 15
        },
        {
            nombre: 'Llavero Spotify Code',
            descripcion: 'Escanea el código para reproducir tu canción favorita.',
            precio: 180.00,
            imagen_url: 'https://ejemplo.com/foto3.jpg',
            categoria: 'Personalizados',
            stock: 50
        }
    ];
    }

    public async iniciar(){
        try{
            await database.query(this.tabla)
            console.log("[DATABASE] La base de datos se ha iniciado exitosamente.")
        }catch (error: any){
            throw new Error(`Error al crear las tablas: ${ error }`)
        }
    }

    public async iniciarSEED(){
        try {
            for (const p of this.productoSEED) {
                const query = `
                    INSERT INTO productos (nombre, descripcion, precio, imagen_url, categoria, stock)
                    VALUES ($1, $2, $3, $4, $5, $6)
                    ON CONFLICT (id) DO NOTHING;
                `;
                const values = [ p.nombre, p.descripcion, p.precio, p.imagen_url, p.categoria, p.stock ];
                await database.query(query, values);
            }

            console.log("[SEED] Se ha creado los productos exitosamente");
        } catch (error) {
            console.error("Error al cargar la seed:", error);
        }
    }
}