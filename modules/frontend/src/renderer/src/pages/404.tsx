import { Card, CardContent, CardHeader, CardTitle } from '@renderer/components/ui/card'
import { Link } from '@renderer/components/ui/link'
import { Routes } from '@renderer/routes/paths'

export default function NotFoundPage() {
  return (
    <div className="bg-gray-100 flex items-center justify-center h-screen">
      <Card className="text-center max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-9xl font-bold text-primary underline">404</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl text-gray-600 mt-4">Página no encontrada</p>
          <p className="text-gray-500 mt-2">Lo sentimos, la página que estás buscando no existe.</p>
          <Link href={Routes.home} className="mt-4">
            <span>Volver al inicio</span>
          </Link>
        </CardContent>
      </Card>
    </div>
  )
}
