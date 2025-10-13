import type { LogInSchema } from '@/schemas/login.schema'
import type { SignUpSchema } from '@/schemas/sign-up.schema'
import type { UserRole } from '@/types'
import type zod from 'zod'

export type User = {
  id: string
  username: string
  email: string
  fullName: string
  userType: UserRole
}

export type SignUp = zod.infer<typeof SignUpSchema>

export type LogIn = zod.infer<typeof LogInSchema>
