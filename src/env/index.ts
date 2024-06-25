import { config } from 'dotenv'
import { hostname } from 'node:os'
import { z } from 'zod'

if (process.env.NODE_ENV === 'test') {
  config({ path: '.env.test'})
} else {
  config()
}

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('production'),
  POSTGRES_PORT: z.coerce.number(),
  POSTGRES_PASSWORD: z.string(),
  POSTGRES_USER: z.string(),
  POSTGRES_DB: z.string(),
  POSTGRES_HOST: z.string(),
  PORT: z.coerce.number()
})

const _env = envSchema.safeParse(process.env)

if (_env.success === false) {
  console.error('Invalid environment variable', _env.error.format())

  throw new Error('Invalid environment variables.')
}
export const env = _env.data