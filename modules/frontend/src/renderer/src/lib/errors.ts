import type { AxiosResponse } from 'axios'
import { $ResponseStatus } from '@renderer/constants'

export function captureServerError<T>(response: AxiosResponse<T>) {
  if (response?.data === $ResponseStatus.error) {
    return [response.data as string, response.data as string]
  }
  return [null, null]
}

export const Errors = {
  400: 'La solicitud no es válida',
  404: 'La página solicitada no existe',
  401: 'No autorizado. Inicie sesión para acceder a esta página',
  403: 'No autorizado. No tiene permiso para acceder a esta página',
  500: 'Ha ocurrido un error interno'
}
