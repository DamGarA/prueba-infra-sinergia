const { app, BrowserWindow } = require('electron')
const path = require('path')

function createWindow() {
  const win = new BrowserWindow({
    width: 600,
    height: 400,
    webPreferences: {
      preload: path.join(__dirname, 'src', 'index.js')
    }
  })

  // Detecta si está empaquetado o en modo desarrollo
  const startUrl = app.isPackaged
    ? `file://${path.join(__dirname, 'public', 'index.html')}`
    : `file://${path.join(__dirname, 'public', 'index.html')}`

  win.loadURL(startUrl)
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})
