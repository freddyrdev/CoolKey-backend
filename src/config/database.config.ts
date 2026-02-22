import { Pool } from 'pg'
import { configEnv } from './env.config.js'

export const database = new Pool({
    host: configEnv.DATABASE_HOST,
    user: configEnv.DATABASE_USER,
    password: configEnv.DATABASE_PASSWORD,
    database: configEnv.DATABASE_NAME,
    port: configEnv.DATABASE_PORT
})