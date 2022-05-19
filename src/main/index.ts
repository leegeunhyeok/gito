import { app, BrowserWindow } from 'electron';
import * as path from 'path';

let mainWindow: BrowserWindow;

const isDev = process.env.NODE_ENV === 'development';
const resourceUrl = isDev
  ? 'http://localhost:3000'
  : `file://${path.join(__dirname, '../build/index.html')}`;

const createWindow = () => {
  mainWindow = new BrowserWindow({
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

  mainWindow.on('closed', () => (mainWindow = undefined!));
  mainWindow.focus();
};

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});
