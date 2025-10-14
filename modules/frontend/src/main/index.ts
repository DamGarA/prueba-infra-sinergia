import { app, shell, BrowserWindow, ipcMain, dialog } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import updater from 'electron-updater'
import icon from '../../resources/icon.png?asset'

// Configure auto-updater
function setupAutoUpdater(mainWindow: BrowserWindow | null): void {
  // Log auto-updater events
  updater.autoUpdater.logger = console
  updater.autoUpdater.autoDownload = false

  updater.autoUpdater.on('checking-for-update', () => {
    console.log('Checking for updates...')
  })

  updater.autoUpdater.on('update-available', () => {
    console.log('Update available - downloading automatically')
    dialog
      .showMessageBox(mainWindow!, {
        type: 'info',
        title: 'Actualización disponible',
        message: 'Se encontró una nueva versión. La descarga comenzará automáticamente.',
        buttons: ['Actualizar', 'Mas tarde']
      })
      .then((result) => {
        if (result.response === 0) {
          updater.autoUpdater.downloadUpdate()
        }
      })
  })

  updater.autoUpdater.on('update-not-available', (info) => {
    console.log('Update not available:', info)
  })

  updater.autoUpdater.on('error', (err) => {
    console.error('Error in auto-updater:', err)
    dialog.showErrorBox(
      'Error de actualización',
      `No se pudo descargar la actualización: ${err.message}`
    )
  })

  updater.autoUpdater.on('download-progress', (progressObj) => {
    const percent = Math.round(progressObj.percent)
    const downloadedMB = (progressObj.transferred / 1024 / 1024).toFixed(2)
    const totalMB = (progressObj.total / 1024 / 1024).toFixed(2)
    const speedMBps = (progressObj.bytesPerSecond / 1024 / 1024).toFixed(2)

    const logMessage = `Descargando actualización: ${percent}% (${downloadedMB}MB / ${totalMB}MB) - Velocidad: ${speedMBps} MB/s`
    console.log(logMessage)

    // Enviar progreso al renderer para mostrar en la UI
    if (mainWindow && !mainWindow.isDestroyed()) {
      mainWindow.webContents.send('download-progress', {
        percent,
        downloaded: downloadedMB,
        total: totalMB,
        speed: speedMBps
      })

      // Actualizar el título de la ventana con el progreso
      mainWindow.setTitle(`Descargando actualización: ${percent}%`)
    }
  })

  updater.autoUpdater.on('update-downloaded', (info) => {
    console.log('Update downloaded:', info)

    // Restaurar el título de la ventana
    if (mainWindow && !mainWindow.isDestroyed()) {
      mainWindow.setTitle('Sinergia')
    }

    dialog
      .showMessageBox(mainWindow!, {
        type: 'info',
        title: 'Actualización lista',
        message: 'La actualización se descargó correctamente. ¿Desea instalarla ahora?',
        detail: 'La aplicación se reiniciará para completar la instalación.',
        buttons: ['Instalar ahora', 'Instalar más tarde']
      })
      .then((result) => {
        if (result.response === 0) {
          updater.autoUpdater.quitAndInstall()
        }
      })
  })
}

let mainWindow: BrowserWindow | null = null

function createWindow(): void {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 900,
    height: 670,
    show: false,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow?.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  // IPC test
  ipcMain.on('ping', () => console.log('pong'))

  createWindow()

  // Setup and check for updates (only in production)
  if (!is.dev) {
    setupAutoUpdater(mainWindow)
    // Check for updates after 3 seconds
    setTimeout(() => {
      updater.autoUpdater.checkForUpdatesAndNotify()
    }, 3000)

    // Check for updates every 6 hours
    setInterval(
      () => {
        updater.autoUpdater.checkForUpdates()
      },
      6 * 60 * 60 * 1000
    )
  }

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
