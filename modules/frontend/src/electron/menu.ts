import { Menu, type MenuItemConstructorOptions, type BrowserWindow } from 'electron';

export const setMainMenu = (_mainWindow: BrowserWindow) => {
    const template = [
        {
            label: 'FixRiver',
            submenu: [
                {
                    label: 'Exit',
                    role: 'quit'
                },
                {
                    label: 'Check for Updates',
                    role: 'update'
                }
            ]
        },
        {
            label: 'View',
            submenu: [
                {
                    label: 'Toggle Full Screen',
                    role: 'toggleFullScreen'
                },
                {
                    label: 'Reload',
                    role: 'reload'
                },
                {
                    label: 'Force Reload',
                    role: 'forceReload'
                },
                {
                    label: 'Toggle Developer Tools',
                    role: 'toggleDevTools'
                }
            ]
        }
    ] as MenuItemConstructorOptions[]

    const menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);
}