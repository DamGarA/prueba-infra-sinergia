import { api } from '@renderer/config/api'
import { $ResponseStatus } from '@renderer/constants'
import { captureServerError } from '@renderer/lib/errors'
import { Services } from '.'

export const refreshToken = async () => {
  try {
    const response = await api.post(Services.auth.refreshToken, null, {
      withCredentials: true
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
