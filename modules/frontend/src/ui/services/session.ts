import { api } from '@/config/api'
import { captureServerError } from '@/utils/errors'
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
  } catch (_) {
    return {
      error: 'Ha ocurrido un error al obtener el usuario',
    }
  }
}
