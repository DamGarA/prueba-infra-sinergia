import type { AxiosResponse } from 'axios'
import { $ResponseStatus } from '@/constants'

// biome-ignore lint/suspicious/noExplicitAny: false positive
export function captureServerError(response: AxiosResponse<any>) {
  if (response?.data?.result?.status === $ResponseStatus.error) {
    return [response.data.result.status as string, response.data.result.errorDetails.message as string]
  }
  return [null, null]
}

export const Errors = {
  400: 'La solicitud no es válida',
  404: 'La página solicitada no existe',
  401: 'No autorizado. Inicie sesión para acceder a esta página',
  403: 'No autorizado. No tiene permiso para acceder a esta página',
  500: 'Ha ocurrido un error interno',
}
