import axios from 'axios'
import { env } from '@/config/env'
import { $CookieKey } from '@/constants'
import { refreshToken } from '@/services/auth'
import { getCookie, setCookie } from '@/utils/cookies'

const api = axios.create({
  baseURL: env.SERVER_URL,
  withCredentials: true,
})

const accessToken = getCookie($CookieKey.session_token)

// Interceptor para añadir token
api.interceptors.request.use((config) => {
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`
  }
  return config
})

// Interceptor para manejar 401 y refrescar
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config

    // Si no es 401 o ya se intento refrescar el token, rechazar la peticion
    if (error.response?.status !== 401 && originalRequest._retry) return

    originalRequest._retry = true
    try {
      // intentar refrescar el token
      const { data: token, error } = await refreshToken()
      if (error) throw new Error(error)
      // Setear el token en la cookie
      setCookie({
        name: $CookieKey.session_token,
        value: token,
        maxAge: 60 * 60 * 24,
      })
      // Setear el token en el header
      originalRequest.headers.Authorization = `Bearer ${token}`
      // reintentar la peticion
      return api(originalRequest)
    } catch (_refreshError) {
      console.error('Refresh token inválido')
      // Redirige a login
      return Promise.reject(error)
    }
  }
)

export { api }
