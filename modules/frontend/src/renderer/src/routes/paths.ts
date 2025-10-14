// Declaración de rutas
export const Routes = {
  home: '/home',
  logIn: '/log-in',
  signUp: '/sign-up',
  user: {
    profile: '/profile'
  },
  forgotPassword: {
    home: '/forgot-password',
    token: (token = ':token') => `/forgot-password/${token}`
  }
} as const
