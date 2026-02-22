import env from "env-var"

export const ConfigEnv = () => {
    PORT: env.get('PORT').required().asPortNumber()
}