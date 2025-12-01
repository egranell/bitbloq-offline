'use strict';
const { app, BrowserWindow } = require('electron');
const path = require('path');
const pjson = require('./package.json');

const PRODUCT_NAME = 'Bitbloq Offline';
const PRODUCT_NAME_WITH_VERSION = PRODUCT_NAME + ' v' + pjson.version;

// Keep a global reference of the window object
let mainWindow = null;

function createWindow() {
    // Create the browser window
    mainWindow = new BrowserWindow({
        show: false,
        minWidth: 800,
        minHeight: 600,
        width: 1440,
        height: 800,
        center: true,
        minimizable: true,
        maximizable: true,
        movable: true,
        closable: true,
        fullscreen: false,
        fullscreenable: true,
        title: PRODUCT_NAME_WITH_VERSION,
        icon: path.join(__dirname, 'app/images/bitbloq_ico.png'),
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            enableRemoteModule: false,
            webSecurity: true
        }
    });

    // Load the index.html of the app
    mainWindow.loadFile(path.join(__dirname, 'app/index.html'));

    // Show window when ready
    mainWindow.once('ready-to-show', () => {
        mainWindow.show();
        mainWindow.setTitle(PRODUCT_NAME_WITH_VERSION);
    });

    // Open DevTools in development mode
    // Uncomment the following line to enable DevTools:
    mainWindow.webContents.openDevTools();

    // Emitted when the window is closed
    mainWindow.on('closed', function() {
        mainWindow = null;
    });
}

// This method will be called when Electron has finished initialization
app.whenReady().then(() => {
    createWindow();

    app.on('activate', function () {
        // On macOS it's common to re-create a window in the app when the
        // dock icon is clicked and there are no other windows open.
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});

// Quit when all windows are closed
app.on('window-all-closed', function() {
    // On macOS, applications and their menu bar stay active until the user
    // quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

// Handle any uncaught exceptions
process.on('uncaughtException', (error) => {
    console.error('Uncaught Exception:', error);
});
