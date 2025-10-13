import { $UserRole } from '@/constants'
import type { User } from '@/types/user'

export function formatUsers(users: User[]) {
  return users.map((user) => {
    return {
      id: user.id,
      fullName: user.fullName,
      username: user.username,
      email: user.email,
      role: $UserRole.user,
    }
  })
}
