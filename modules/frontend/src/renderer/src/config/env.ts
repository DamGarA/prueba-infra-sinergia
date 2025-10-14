import type { z } from 'zod'
import { object, url } from 'zod'

const EnvSchema = object({
  VITE_SERVER_URL: url({
    message: 'SERVER_URL must be a valid URL'
  }).min(1, {
    message: 'SERVER_URL is required'
  })
})
type Env = z.infer<typeof EnvSchema>

let envResult: Env

try {
  envResult = EnvSchema.parse(import.meta.env)
} catch (error) {
  alert(error)
  throw new Error(`Error validating environment variables: ${error}`)
}

export const env = {
  SERVER_URL: envResult.VITE_SERVER_URL
}
