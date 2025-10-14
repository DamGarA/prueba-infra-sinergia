import type { $SessionStatus, $UserRole } from '@renderer/constants'

export type UserRole = (typeof $UserRole)[keyof typeof $UserRole]

export type SessionStatus = (typeof $SessionStatus)[keyof typeof $SessionStatus]

export type Session = {
  email: string
  avatar: string
  username: string
  fullName: string
  accessToken: string
  role: UserRole
}
