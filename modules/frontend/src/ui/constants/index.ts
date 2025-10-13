export const $SessionStatus = {
  unauthenticated: 'UNAUTHENTICATED',
  authenticated: 'AUTHENTICATED',
  unauthenticated_error: 'UNAUTHENTICATED_ERROR',
  loading: 'LOADING',
} as const

export const $UserRole = {
  user: 'user',
  admin: 'admin',
} as const

export const $ResponseStatus = {
  success: 'success',
  error: 'error',
} as const

export const $CookieKey = {
  session_token: 'session_token',
} as const

export const $LocalStorageKey = {
  session_token: 'session_token',
} as const

export const $QueryKey = {
  session: 'session',
} as const
