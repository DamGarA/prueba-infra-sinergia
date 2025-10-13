import { Routes } from './paths'

export const UserRoutes = [
  {
    path: Routes.user.profile,
    async lazy() {
      const module = await import('@/pages/profile')
      return { Component: module.default }
    },
  },
]
