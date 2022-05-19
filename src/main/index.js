"use strict";
exports.__esModule = true;
var electron_1 = require("electron");
var path = require("path");
var mainWindow;
var isDev = process.env.NODE_ENV === 'development';
var resourceUrl = isDev
    ? 'http://localhost:3000'
    : "file://".concat(path.join(__dirname, '../build/index.html'));
var createWindow = function () {
    mainWindow = new electron_1.BrowserWindow({
        title: 'Gito',
        width: 360,
        height: 130,
        frame: false,
        titleBarStyle: 'hidden',
        transparent: true,
        useContentSize: true,
        resizable: false,
        acceptFirstMouse: true,
        webPreferences: {
            nodeIntegration: true
        }
    });
    mainWindow.loadURL(resourceUrl);
    if (isDev) {
        mainWindow.webContents.openDevTools({ mode: 'detach' });
    }
    mainWindow.on('closed', function () { return (mainWindow = undefined); });
    mainWindow.focus();
};
electron_1.app.on('ready', createWindow);
electron_1.app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
        electron_1.app.quit();
    }
});
electron_1.app.on('activate', function () {
    if (mainWindow === null) {
        createWindow();
    }
});
