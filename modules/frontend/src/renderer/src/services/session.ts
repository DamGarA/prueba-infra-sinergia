import { api } from '@renderer/config/api'
import { captureServerError } from '@renderer/lib/errors'
import { $ResponseStatus } from '../constants'
import { Services } from './index'

export const getSession = async () => {
  try {
    const response = await api.post(Services.auth.session)

    const [status, message] = captureServerError(response)

    if (status === $ResponseStatus.error) {
      return {
        error: message,
      }
    }

    return {
      data: response.data,
    }
  } catch (error) {
    console.error(error)
    return {
      error: 'Ha ocurrido un error al obtener el usuario',
    }
  }
}
