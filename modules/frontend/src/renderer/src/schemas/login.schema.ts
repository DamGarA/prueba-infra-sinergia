import zod from 'zod'
import { passwordRules } from '.'

export const LogInSchema = zod.object({
  email: zod
    .string()
    .min(5, 'El nombre de usuario debe contener al menos 5 caracteres')
    .max(25, 'El nombre de usuario debe tener un máximo de 25 caracteres')
    .email('Requerido, por favor introduzca su nombre de usuario'),
  password: zod
    .string()
    .min(8, 'Requerido, por favor ingrese la contraseña')
    .regex(
      passwordRules,
      'Debe contener 8 caracteres, una mayúscula, una minúscula, un numero y un carácter especial: : ! @ # . * % & @'
    )
})
