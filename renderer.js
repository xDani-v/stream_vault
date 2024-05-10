const { ipcRenderer } = require('electron')

ipcRenderer.on('menu-item-1', () => {
    // Aquí va el código que se ejecutará cuando se haga clic en el elemento del menú 1
})

ipcRenderer.on('menu-item-2', () => {
    // Aquí va el código que se ejecutará cuando se haga clic en el elemento del menú 2
})