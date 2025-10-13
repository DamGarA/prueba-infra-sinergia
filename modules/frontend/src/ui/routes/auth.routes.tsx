import { Routes } from './paths'

export const AuthRoutes = [
  {
    path: Routes.logIn,
    async lazy() {
      const module = await import('@/pages/log-in')
      return { Component: module.default }
    },
  },
  {
    path: Routes.signUp,
    async lazy() {
      const module = await import('@/pages/sign-up')
      return { Component: module.default }
    },
  },
]
