import { api } from '@/config/api'
import { $ResponseStatus } from '@/constants'
import { captureServerError } from '@/utils/errors'
import { Services } from '.'

export const refreshToken = async () => {
  try {
    const response = await api.post(Services.auth.refreshToken, null, {
      withCredentials: true,
    })

    const [status, message] = captureServerError(response)

    if (status === $ResponseStatus.error) {
      return {
        error: message as string,
      }
    }

    return {
      data: response.data as string,
    }
  } catch (error) {
    console.error(' Error en refresh token:', error)
    return {
      error: 'Error al refrescar el token',
    }
  }
}
