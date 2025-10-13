import axios from 'axios'
import { $ResponseStatus } from '@/constants'
import type { SignUp } from '@/types/user'
import { Services } from '.'

export const signUp = async ({ email, password }: SignUp) => {
  try {
    const response = await axios.post(Services.auth.signUp, {
      email,
      password,
    })

    if (response.data.status === $ResponseStatus.error) {
      return {
        error: 'Ha ocurrido un error',
      }
    }

    return {
      data: {
        message: 'Registro exitoso',
      },
    }
  } catch (error) {
    console.error(error)
    return {
      error: 'Ha ocurrido un error',
    }
  }
}
