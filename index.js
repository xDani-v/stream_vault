const { app, BrowserWindow, Menu, MenuItem } = require('electron')

let mainWindow

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        }
    })

    mainWindow.loadFile('views/clientes.html')

    const menu = new Menu()
    menu.append(new MenuItem({
        label: 'Clientes',
        click: () => { mainWindow.loadFile('views/clientes.html') }
    }))
    menu.append(new MenuItem({
        label: 'Vista 2',
        click: () => { mainWindow.loadFile('views/view2.html') }
    }))

    mainWindow.webContents.openDevTools()

    Menu.setApplicationMenu(menu)
}

app.whenReady().then(createWindow)