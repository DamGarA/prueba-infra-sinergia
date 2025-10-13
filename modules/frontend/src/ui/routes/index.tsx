// import { $UserRole } from '@/constants'

import { createBrowserRouter } from 'react-router'
import { Loader } from '@/components/icons'
import AppLayout from '@/layout/App.layout'
import AuthLayout from '@/layout/Auth.layout'
import { AppRoutes } from './app.routes'
import { AuthRoutes } from './auth.routes'
// import NotFoundPage from '@/pages/404'
// import LogIn from '@/pages/log-in'
// import Profile from '@/pages/profile'
// import SignUp from '@/pages/sign-up'
// import { Suspense } from 'react'
// import { BrowserRouter, Route, Routes as AppRoutes } from 'react-router'
import { UserRoutes } from './user.routes'

// export const AppRouter = () => {
//   return (
//     <Suspense
//       fallback={
//         <div className="h-screen w-full grid place-content-center">
//           <Loader />
//         </div>
//       }
//     >
//       <BrowserRouter>
//         <AppRoutes>
//           {/* Auth routes */}
//           <Route element={<AuthLayout />}>
//             <Route path={Routes.logIn} element={<LogIn />} />
//             <Route path={Routes.signUp} element={<SignUp />} />
//           </Route>
//           {/* Auth routes */}

//           {/* Common routes */}
//           <Route element={<AppLayout validate={false} />}>
//             <Route path={Routes.home} element={<Home />} />
//           </Route>
//           {/* Common routes */}

//           {/* User routes */}
//           <Route element={<AppLayout rolesAllowed={[$UserRole.user]} redirect={Routes.logIn} validate={false} />}>
//             <Route path={Routes.user.profile} element={<Profile />} />
//           </Route>
//           {/* User routes */}

//           {/* Not found */}
//           <Route path="*" element={<NotFoundPage />} />
//           {/* Not found */}
//         </AppRoutes>
//       </BrowserRouter>
//     </Suspense>
//   )
// }

const AppFallback = () => {
  return (
    <div className="h-screen w-full grid place-content-center">
      <Loader />
    </div>
  )
}

export const router = createBrowserRouter(
  [
    {
      element: <AppLayout validate={false} />,
      children: AppRoutes,
      HydrateFallback: AppFallback,
    },
    {
      // element: <AppLayout rolesAllowed={[$UserRole.user]} redirect={Routes.logIn} validate={false} />,
      element: <AppLayout validate={false} />,
      children: UserRoutes,
      HydrateFallback: AppFallback,
    },
    {
      element: <AuthLayout />,
      children: AuthRoutes,
      HydrateFallback: AppFallback,
    },
    {
      path: '*',
      async lazy() {
        // Forma larga de importar - El componente no debe ser exportado por defecto y no importa su nombre
        const module = await import('@/pages/404')
        return { Component: module.default }
      },
      HydrateFallback: AppFallback,
    },
  ],
  { basename: '/' }
)
