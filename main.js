const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow() {
  const win = new BrowserWindow({
    width: 600,
    height: 400,
  });

  // Carga el index.html desde la carpeta empaquetada
  win.loadFile(path.join(__dirname, 'public', 'index.html'));

  // win.webContents.openDevTools(); // activalo si querés debuggear
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
