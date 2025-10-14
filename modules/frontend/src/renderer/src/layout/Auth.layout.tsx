// import { Routes } from '@renderer/routes'
// import { useSession } from '@renderer/store/session'
// import { useEffect } from 'react'
import { Outlet } from 'react-router'
import { AppIcon } from '@renderer/components/app-icon'
import { Typography } from '@renderer/components/ui/typography'
import Meta from '@renderer/meta.json'

export default function AuthLayout() {
  // const { session } = useSession()
  // const navigate = useNavigate()

  // useEffect(() => {
  //   if (session?.accessToken !== null) {
  //     navigate(Routes.home)
  //   }
  // }, [session?.accessToken])

  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-md flex-col gap-6">
        <div className="flex items-center gap-2 self-center font-medium">
          <div className="bg-primary text-primary-foreground flex items-center justify-center rounded-md p-2">
            <AppIcon className="size-5" />
          </div>
          <Typography as="h1" size="title">
            {Meta.title}
          </Typography>
        </div>
        <Outlet />
      </div>
    </div>
  )
}
