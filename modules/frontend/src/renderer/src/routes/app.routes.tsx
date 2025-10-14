import { Routes } from './paths'

export const AppRoutes = [
  {
    path: Routes.home,
    async lazy() {
      const module = await import('@renderer/pages/home')
      return { Component: module.default }
    }
  }
]
