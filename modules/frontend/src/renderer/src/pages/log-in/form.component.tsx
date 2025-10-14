import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { type SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { Button } from '@renderer/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@renderer/components/ui/card'
import { Input } from '@renderer/components/ui/input'
import { Label } from '@renderer/components/ui/label'
import { Link } from '@renderer/components/ui/link'
import { Typography } from '@renderer/components/ui/typography'
import Meta from '@renderer/meta.json'
import { Routes } from '@renderer/routes/paths'
import { LogInSchema } from '@renderer/schemas/login.schema'
import { logIn } from '@renderer/services/logIn'
import { useSession } from '@renderer/store/session'
import type { LogIn } from '@renderer/types/user'

export default function LogInForm() {
  const { mutateAsync, isPending } = useMutation({
    mutationFn: logIn
  })

  const { setSession, setSessionToken } = useSession()
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LogIn>({
    resolver: zodResolver(LogInSchema)
  })

  const onSubmit: SubmitHandler<LogIn> = async (data) => {
    const { data: response, error } = await mutateAsync(data)

    if (response?.data) {
      setSession(response.data)
      setSessionToken(response.data.accessToken)
    } else toast.error(error)
  }

  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Inicia sesión</CardTitle>
          <CardDescription>Ingresa tus datos para iniciar sesión en {Meta.title}</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-6">
              <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                <span className="bg-card text-muted-foreground relative z-10 px-2">
                  Bienvenido de vuelta
                </span>
              </div>
              <div className="grid gap-6">
                <div className="grid gap-1">
                  <Label htmlFor="email">Email</Label>
                  <div>
                    <Input {...register('email')} placeholder="john@example.com" />
                    {errors.email && (
                      <Typography theme="error" size="small">
                        {errors.email.message}
                      </Typography>
                    )}
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-1">
                  <Label htmlFor="password" className="col-span-1">
                    Contraseña
                  </Label>
                  <Link
                    href={Routes.forgotPassword.home}
                    className="ml-auto text-sm underline-offset-4 hover:underline col-span-2 h-fit"
                  >
                    ¿Olvidaste tu contraseña?
                  </Link>

                  <div className="col-span-full">
                    <Input type="password" {...register('password')} placeholder="********" />
                    {errors.password && (
                      <Typography theme="error" size="small">
                        {errors.password.message}
                      </Typography>
                    )}
                  </div>
                </div>
                <Button type="submit" className="w-full" loading={isPending}>
                  Inicia sesión
                </Button>
              </div>

              <p className="text-center text-sm">
                ¿No tienes una cuenta?{' '}
                <Link href={Routes.signUp} className="underline underline-offset-4">
                  Regístrate
                </Link>
              </p>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
