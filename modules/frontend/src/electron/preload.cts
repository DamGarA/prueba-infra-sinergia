const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
    send: (channel: string, data: any) => ipcRenderer.send(channel, data),
    on: (channel: string, func: any) =>
        ipcRenderer.on(channel, (_event: any, ...args: any[]) => func(...args)),
});