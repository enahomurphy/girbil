/* eslint-disable import/no-extraneous-dependencies */
const { app, ipcMain, Notification } = require('electron');
const { existsSync } = require('fs');

const { logger, setToken } = require('./utils');
const createMainWindow = require('./windows/main/main');

let mainWindow;
let deeplinkingUrl;

const createWindow = () => {
  mainWindow = createMainWindow();
  logger(mainWindow, process.env.NODE_ENV);

  if (process.platform === 'win32') {
    if (deeplinkingUrl && deeplinkingUrl.match('token=')) {
      setToken(mainWindow, deeplinkingUrl.split('token=')[1]);
    }
  }
};

app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
    mainWindow.close();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});

if (!app.isDefaultProtocolClient('girbil')) {
  app.setAsDefaultProtocolClient('girbil');
}

app.on('will-finish-launching', () => {
  // Protocol handler for osx
  app.on('open-url', (event, url) => {
    event.preventDefault();
    deeplinkingUrl = url;
    logger(mainWindow, `open-url# ${deeplinkingUrl}`);

    if (deeplinkingUrl && deeplinkingUrl.match('token=')) {
      setToken(mainWindow, deeplinkingUrl.split('token=')[1]);
    }
  });
});

app.setLoginItemSettings({
  openAtLogin: true,
});

// IPC events
ipcMain.on('quit', () => {
  app.exit();
});

ipcMain.on('minimize', () => {
  mainWindow.minimize();
});

ipcMain.on('show', () => {
  mainWindow.show();
});

ipcMain.on('open-on-login', (_, state) => {
  app.setLoginItemSettings({
    openAtLogin: state,
  });
});

ipcMain.on('notify', () => {
  if (process.platform === 'darwin') {
    const hasSound = existsSync('~/Library/Sounds/Girbil.aiff');
    logger(mainWindow, hasSound);
  }

  new Notification({
    body: 'asdsdasdadsada',
    sound: 'Girbil',
  }).show();
});
