import 'dotenv/config'
import env from "env-var"

export const configEnv = {
    PORT: env.get('PORT').required().asPortNumber()
}