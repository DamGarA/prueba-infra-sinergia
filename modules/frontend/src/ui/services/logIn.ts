import axios from 'axios'
import { $ResponseStatus } from '@/constants'
import type { LogIn } from '@/types/user'
import { captureServerError } from '@/utils/errors'
import { Services } from '.'

export const logIn = async ({ email, password }: LogIn) => {
  try {
    const response = await axios.post(Services.auth.logIn, {
      email,
      password,
    })

    const [status, message] = captureServerError(response)

    if (status === $ResponseStatus.error) {
      return {
        error: message as string,
      }
    }

    return {
      data: response.data,
    }
  } catch (error) {
    console.error(error)
    return {
      error: 'Ha ocurrido un error al iniciar sesión',
    }
  }
}
