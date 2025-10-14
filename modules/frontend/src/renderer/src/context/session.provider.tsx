import { useQuery } from '@tanstack/react-query'
import { type PropsWithChildren, useEffect } from 'react'
import { toast } from 'sonner'
import { $QueryKey, $SessionStatus } from '@renderer/constants'
import { getSession } from '@renderer/services/session'
import { useSession } from '@renderer/store/session'
import useCookies from '@renderer/hooks/useCookies'

type LoadSessionProviderProps = PropsWithChildren

export const LoadSessionProvider = ({ children }: LoadSessionProviderProps) => {
  const { setSessionStatus, setSession, setIsLoading, session: store } = useSession()
  const { cookies } = useCookies()
  const {
    data: session,
    refetch,
    isPending
  } = useQuery({
    queryKey: [$QueryKey.session],
    queryFn: getSession,
    enabled: false
  })

  // biome-ignore lint/correctness/useExhaustiveDependencies: false positive
  useEffect(() => {
    // Si hay token y no hay datos de la session en el store, refetch
    if (cookies.session_token && !store) {
      refetch()
      setIsLoading(isPending)

      if (isPending) setSessionStatus($SessionStatus.loading)

      if (session?.data) {
        setSession(session.data)
        setSessionStatus($SessionStatus.authenticated)
      }

      if (session?.error) {
        toast.error(session.error)
        setSessionStatus($SessionStatus.unauthenticated_error)
      }
    }
  }, [
    cookies.session_token,
    session,
    setIsLoading,
    setSessionStatus,
    setSession,
    refetch,
    store,
    isPending
  ])

  return children
}
