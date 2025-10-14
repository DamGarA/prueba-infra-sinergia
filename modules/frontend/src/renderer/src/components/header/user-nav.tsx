import { ExitIcon, PersonIcon } from '@radix-ui/react-icons'
import { Link } from 'react-router'
import { Avatar, AvatarFallback, AvatarImage } from '@renderer/components/ui/avatar'
import { Popover, PopoverContent, PopoverTrigger } from '@renderer/components/ui/popover'
import { Routes } from '@renderer/routes/paths'
import { useSession } from '@renderer/store/session'

export const UserNavar = () => {
  const { session, signOut } = useSession()

  if (!session)
    return (
      <Link className="flex items-center gap-x-2 font-medium text-gray-500 hover:text-blue-600" to={Routes.logIn}>
        <PersonIcon />
        Log in
      </Link>
    )

  return (
    <Popover>
      <PopoverTrigger>
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </PopoverTrigger>
      <PopoverContent className="w-60 flex flex-col bg-white text-black">
        <div>
          <div className="space-y-2 flex justify-around items-center ">
            <div className="flex items-center font-semibold">
              <Link to={Routes.user.profile}>{session?.email}</Link>
            </div>
          </div>
          <div className="flex justify-around items-center mt-3">
            <button
              onClick={signOut}
              type="button"
              className="flex items-center justify-center gap-2 text-white bg-red-400 hover:bg-white border border-white hover:text-red-400 hover:border-red-400 duration-200 w-full py-1 px-3 rounded text-center"
            >
              <span>Cerrar session</span>
              <ExitIcon />
            </button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
