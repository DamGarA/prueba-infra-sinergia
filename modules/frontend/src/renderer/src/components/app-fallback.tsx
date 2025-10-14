import { Loader } from '@renderer/components/loader'

export const AppFallback = () => {
  return (
    <div className="h-screen w-full grid place-content-center">
      <Loader />
    </div>
  )
}
