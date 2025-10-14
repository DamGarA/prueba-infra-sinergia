import { ElectronAPI } from '@electron-toolkit/preload'

interface DownloadProgress {
  percent: number
  downloaded: string
  total: string
  speed: string
}

interface API {
  onDownloadProgress: (callback: (progress: DownloadProgress) => void) => void
  removeDownloadProgressListener: () => void
}

declare global {
  interface Window {
    electron: ElectronAPI
    api: API
  }
}
