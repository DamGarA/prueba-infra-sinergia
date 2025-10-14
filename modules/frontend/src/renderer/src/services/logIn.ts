import axios from 'axios'
import { $ResponseStatus } from '@renderer/constants'
import type { LogIn } from '@renderer/types/user'
import { captureServerError } from '@renderer/lib/errors'
import { Services } from '.'

export const logIn = async ({ email, password }: LogIn) => {
  try {
    const response = await axios.post(Services.auth.logIn, {
      email,
      password
    })

    const [status, message] = captureServerError(response)

    if (status === $ResponseStatus.error) {
      return {
        error: message as string
      }
    }

    return {
      data: response.data
    }
  } catch (error) {
    console.error(error)
    return {
      error: 'Ha ocurrido un error al iniciar sesión'
    }
  }
}
