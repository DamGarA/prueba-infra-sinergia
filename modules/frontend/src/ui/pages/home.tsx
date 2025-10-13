import { Card } from '@/components/shadcn/card'
import type { User } from '@/types/user'

export const CardUser = ({ fullName, username }: Pick<User, 'fullName' | 'username'>) => {
  return (
    <Card
      component="li"
      className="h-96 flex flex-col justify-between relative overflow-hidden p-0 hover:shadow-lg transition-shadow"
    >
      {/* 
        <div className="w-full h-full grid place-content-center">
          <Person className="w-40 h-40" />
        </div> 
      */}

      <picture className="w-full absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1552058544-f2b08422138a?q=80&w=1998&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="avatar"
          className="object-cover -z-[1] h-full w-full"
        />
      </picture>
      <div />
      <div className="flex flex-col backdrop-blur-sm px-3 py-2 bg-neutral-200/90 border-t border-t-neutral-200/50">
        <h2 className="font-semibold text-lg">{fullName}</h2>
        <span className="text-neutral-700">{username}</span>
      </div>
    </Card>
  )
}

export default function Home() {
  return (
    <ul className="grid grid-cols-4 gap-4">
      {[
        {
          id: 1,
          fullName: 'John Doe',
          username: 'johndoe',
        },
      ].map((user) => (
        <CardUser key={user.id} fullName={user.fullName} username={user.username} />
      ))}
    </ul>
  )
}
