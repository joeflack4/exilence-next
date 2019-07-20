import * as Sentry from '@sentry/electron';
import { app, BrowserWindow, screen, dialog } from 'electron';
import * as path from 'path';
import * as url from 'url';

const log = require('electron-log');
const { autoUpdater } = require('electron-updater');

autoUpdater.logger = log;
autoUpdater.logger.transports.file.level = 'info';
log.info('App starting...');

Sentry.init({ dsn: 'https://81deb5bd2814402f9efd7db4cfd84fd2@sentry.io/1507995' });

let win, serve;
const args = process.argv.slice(1);
const ipcMain = require('electron').ipcMain;
serve = args.some(val => val === '--serve');

ipcMain.on('statusToWindow', (text) => {
  log.info(text);
  win.webContents.send('message', text);
});

ipcMain.on('relaunch', () => {
  app.relaunch();
});

function createWindow() {

  const electronScreen = screen;
  const size = electronScreen.getPrimaryDisplay().workAreaSize;

  // Create the browser window.
  win = new BrowserWindow({
    x: 0,
    y: 0,
    width: size.width,
    height: size.height,
    webPreferences: {
      nodeIntegration: true,
      webSecurity: false
    },
    frame: false
  });

  if (serve) {
    require('electron-reload')(__dirname, {
      electron: require(`${__dirname}/node_modules/electron`)
    });
    win.loadURL('http://localhost:4200');
  } else {
    win.loadURL(url.format({
      pathname: path.join(__dirname, 'dist/index.html'),
      protocol: 'file:',
      slashes: true
    }));
  }

  if (serve) {
    win.webContents.openDevTools();
    // BrowserWindow.addDevToolsExtension(
    //   // tslint:disable-next-line:max-line-length
    //   path.join(os.homedir(), '\\AppData\\Local\\Google\\Chrome\\User Data\\Default\\Extensions\\lmhkpmbekcpmknklioeibfkpmmfibljd\\2.17.0_0')
    // );
  }

  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store window
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null;
  });
}

try {
  // This method will be called when Electron has finished
  // initialization and is ready to create browser windows.
  // Some APIs can only be used after this event occurs.
  app.on('ready', function () {
    autoUpdater.checkForUpdatesAndNotify();
    createWindow();
  });

  // Quit when all windows are closed.
  app.on('window-all-closed', () => {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });

  app.on('activate', () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (win === null) {
      createWindow();
    }
  });

} catch (e) {
  // Catch Error
  // throw e;
}
