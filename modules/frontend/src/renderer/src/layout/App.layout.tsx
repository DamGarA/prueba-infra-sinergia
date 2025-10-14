import { Outlet } from 'react-router'
import { Footer } from '@renderer/components/footer'
import { Header } from '@renderer/components/header'
import { Container } from '@renderer/components/ui/container'
import { ProtectedRoute } from '@renderer/context/protected-route.provider'
import { Routes } from '@renderer/routes/paths'
import type { UserRole } from '@renderer/types'

const Common = () => {
  return (
    <>
      <Header />
      <Container component="main" className="min-h-[80dvh] my-4 px-4 sm:px-6 lg:px-8">
        <Outlet />
      </Container>
      <Footer />
    </>
  )
}
export default function AppLayout(
  { rolesAllowed, redirect, validate }: { rolesAllowed?: UserRole[]; redirect?: string; validate?: boolean } = {
    redirect: Routes.logIn,
    validate: true,
  }
) {
  if (validate === false) {
    return <Common />
  }

  return (
    <ProtectedRoute redirect={redirect} rolesAllowed={rolesAllowed}>
      <Common />
    </ProtectedRoute>
  )
}
