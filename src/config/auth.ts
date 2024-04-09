import { getEnvConfig } from './env'

export default {
  jwt: { secret: getEnvConfig('JWT_SECRET'), expiresIn: '3d' },
}
