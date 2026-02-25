import 'dotenv/config'
import env from "env-var"

export const configEnv = {
    PORT: env.get('PORT').required().asPortNumber(),
    DATABASE_HOST: env.get('DATABASE_HOST').required().asString(),
    DATABASE_USER: env.get('DATABASE_USER').required().asString(),
    DATABASE_PASSWORD: env.get('DATABASE_PASSWORD').required().asString(),
    DATABASE_NAME: env.get('DATABASE_NAME').required().asString(),
    DATABASE_PORT: env.get('DATABASE_PORT').required().asPortNumber(),
    JWT_SEED: env.get('JWT_SEED').required().asString(),
}