import zod from 'zod'
import { LogInSchema } from './login.schema'

export const SignUpSchema = LogInSchema.extend({
  name: zod
    .string()
    .min(2, 'Requerido, por favor ingrese su nombre')
    .max(100, 'El nombre no puede exceder los 100 caracteres'),
  _password: zod.string().min(8, 'Requerido, por favor ingrese la contraseña')
}).refine((data) => data.password === data._password, {
  message: 'Las contraseñas no coinciden',
  path: ['_password']
})
