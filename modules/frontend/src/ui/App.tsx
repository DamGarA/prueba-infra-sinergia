import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { RouterProvider } from 'react-router/dom'
import { Toaster } from 'sonner'
import { LoadSessionProvider } from '@/context/session.provider'
import { router } from './routes'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
})

function App() {
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
