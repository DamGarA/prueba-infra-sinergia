import type { PropsWithChildren } from 'react'
import AccessDenied from '@renderer/pages/access-denied'
import { Loader } from '@renderer/components/loader'
import { useSession } from '@renderer/store/session'
import type { UserRole } from '@renderer/types'

type ProtectedRouteProps = PropsWithChildren & {
  redirect?: string
  rolesAllowed?: UserRole[]
}

export const ProtectedRoute = ({ children, rolesAllowed }: ProtectedRouteProps) => {
  const { session, isLoading } = useSession()

  if (isLoading)
    return (
      <div className="w-screen h-screen grid place-items-center">
        <Loader />
      </div>
    )

  if (!session?.accessToken || !rolesAllowed?.includes(session?.role)) {
    return <AccessDenied />
  }

  return children
}
