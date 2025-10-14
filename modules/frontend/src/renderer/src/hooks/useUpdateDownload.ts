import { useEffect, useRef } from 'react'
import { toast } from 'sonner'

export function useUpdateDownload() {
  const toastIdRef = useRef<string | number | null>(null)

  useEffect(() => {
    const handleDownloadProgress = (progress: {
      percent: number
      downloaded: string
      total: string
      speed: string
    }) => {
      const message = `${progress.percent}% - ${progress.downloaded}MB / ${progress.total}MB (${progress.speed} MB/s)`

      if (toastIdRef.current) {
        // Actualizar el toast existente
        toast.loading(message, {
          id: toastIdRef.current,
          description: 'Descargando actualización...'
        })
      } else {
        // Crear un nuevo toast
        toastIdRef.current = toast.loading(message, {
          description: 'Descargando actualización...',
          duration: Infinity
        })
      }

      // Si la descarga está completa, cerrar el toast
      if (progress.percent >= 100) {
        setTimeout(() => {
          if (toastIdRef.current) {
            toast.dismiss(toastIdRef.current)
            toastIdRef.current = null
          }
        }, 2000)
      }
    }

    // Registrar el listener
    window.api.onDownloadProgress(handleDownloadProgress)

    // Cleanup
    return () => {
      window.api.removeDownloadProgressListener()
      if (toastIdRef.current) {
        toast.dismiss(toastIdRef.current)
      }
    }
  }, [])
}
