import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { RouterProvider } from 'react-router/dom'
import { Toaster } from 'sonner'
import { LoadSessionProvider } from '@renderer/context/session.provider'
import { useUpdateDownload } from '@renderer/hooks/useUpdateDownload'
import { router } from './routes'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false
    }
  }
})

function App() {
  // Hook para mostrar el progreso de descarga de actualizaciones
  useUpdateDownload()

  return (
    <QueryClientProvider client={queryClient}>
      <LoadSessionProvider>
        <RouterProvider router={router} />
        <Toaster position="bottom-right" />
      </LoadSessionProvider>
    </QueryClientProvider>
  )
}

export default App
