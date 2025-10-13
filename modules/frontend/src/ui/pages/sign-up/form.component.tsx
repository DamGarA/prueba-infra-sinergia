import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { type SubmitHandler, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router'
import { toast } from 'sonner'
import { Button } from '@/components/shadcn/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/shadcn/card'
import { Input } from '@/components/shadcn/input'
import { Label } from '@/components/shadcn/label'
import { Link } from '@/components/shadcn/link'
import Meta from '@/data/meta.json'
import { Routes } from '@/routes/paths'
import { SignUpSchema } from '@/schemas/sign-up.schema'
import { signUp } from '@/services/signUp'
import type { SignUp } from '@/types/user'

export default function SignUpForm() {
  const navigate = useNavigate()
  const { mutateAsync, isPending } = useMutation({
    mutationFn: signUp,
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUp>({
    resolver: zodResolver(SignUpSchema),
  })

  const onSubmit: SubmitHandler<SignUp> = async (data) => {
    const { data: response, error } = await mutateAsync(data)

    if (response?.message) {
      navigate(Routes.logIn)
      toast.success(response.message)
    } else toast.error(error)
  }

  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Regístrate</CardTitle>
          <CardDescription>Ingresa tus datos para crear una cuenta en {Meta.title}</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-6">
              <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                <span className="bg-card text-muted-foreground relative z-10 px-2">Bienvenido</span>
              </div>
              <div className="grid gap-6">
                {/* Nombre y Apellido */}
                <div className="col-span-2 flex flex-col gap-1">
                  <Label htmlFor="name">Nombre</Label>
                  <Input {...register('name')} placeholder="Nombre" />
                  {errors.name && <span className="text-red-400 text-xs">{errors.name.message}</span>}
                </div>
                {/* Email */}
                <div className="col-span-2 flex flex-col gap-1">
                  <Label htmlFor="email">Email</Label>
                  <Input {...register('email')} placeholder="john@example.com" />
                  {errors.email && <span className="text-red-400 text-xs">{errors.email.message}</span>}
                </div>
                {/* Password */}
                <div className="col-span-2 flex flex-col gap-1">
                  <Label htmlFor="password">Contraseña</Label>
                  <Input type="password" {...register('password')} placeholder="********" />
                  {errors.password && <span className="text-red-400 text-xs">{errors.password.message}</span>}
                </div>
                {/* Confirm Password */}
                <div className="col-span-2 flex flex-col gap-1">
                  <Label htmlFor="_password">Repite la contraseña</Label>
                  <Input type="password" {...register('_password')} placeholder="********" />
                  {errors._password && <span className="text-red-400 text-xs">{errors._password.message}</span>}
                </div>

                <Button type="submit" className="col-span-2" loading={isPending}>
                  Regístrate
                </Button>
              </div>
              <p className="text-center text-sm">
                ¿Tienes una cuenta?{' '}
                <Link href={Routes.logIn} className="underline underline-offset-4">
                  Inicia sesión
                </Link>
              </p>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
