import { z } from 'zod'

const envSchema = z.object({
  NEXT_PUBLIC_API_BASE_URL: z.string().url(),
  APP_URL: z.string().url(),
})

const _env = envSchema.safeParse(process.env)

if (!_env.success) {
  console.error('Invalid enviroments variables', _env.error.format())

  throw new Error('Invalid enviroments variables')
}

export const env = _env.data
