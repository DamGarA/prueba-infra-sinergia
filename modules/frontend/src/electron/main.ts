import path from 'node:path';
import { app, BrowserWindow } from 'electron';
import { setMainMenu } from './menu.js';
import { fileURLToPath } from 'node:url';

let mainWindow: BrowserWindow

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log(__dirname, path.join(__dirname, 'preload.cjs'));

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 1200,
        height: 800,
        webPreferences: {
            preload: path.join(__dirname, 'preload.cjs'),
            nodeIntegration: false,
            contextIsolation: true,
        }
    });

    setMainMenu(mainWindow);
    mainWindow.loadFile(path.join(__dirname, '../dist-react/index.html'));
    mainWindow.webContents.openDevTools(); // this is optional thing, use it if you see a devTool window opened
}

app.whenReady().then(() => {
    console.log('ready');
}).then(createWindow)

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})