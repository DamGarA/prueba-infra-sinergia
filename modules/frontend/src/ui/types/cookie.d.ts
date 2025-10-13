import type { $CookieKey } from '@/constants'

export type CookieKey = (typeof $CookieKey)[keyof typeof $CookieKey]

export type CookieOptions = {
  name: CookieKey
  value?: string | null
  expires?: string | Date
  maxAge?: number
  path?: string
  secure?: boolean
  httpOnly?: boolean
  sameSite?: 'strict' | 'lax' | 'none'
}
