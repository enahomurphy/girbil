/*
    Licensed to the Apache Software Foundation (ASF) under one
    or more contributor license agreements.  See the NOTICE file
    distributed with this work for additional information
    regarding copyright ownership.  The ASF licenses this file
    to you under the Apache License, Version 2.0 (the
    "License"); you may not use this file except in compliance
    with the License.  You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing,
    software distributed under the License is distributed on an
    "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, either express or implied.  See the License for the
    specific language governing permissions and limitations
    under the License.
*/

const fs = require('fs');
// Module to control application life, browser window and tray.
const { app, BrowserWindow } = require('electron');
// Electron settings from .json file.
const cdvElectronSettings = require('./cdv-electron-settings.json');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

let deeplinkingUrl;

// Log both at dev console and at running node console instance
function logEverywhere(log) {
  if (mainWindow && mainWindow.webContents) {
    mainWindow.webContents.executeJavaScript(`console.log("${log}")`);
  }
}

function setToken(token) {
  if (mainWindow && mainWindow.webContents) {
    mainWindow.webContents.executeJavaScript(`
      localStorage.setItem('gb-token', '${token}');
      window.location.reload();
    `);
  }
}


// Force Single Instance Application
const gotTheLock = app.requestSingleInstanceLock();
if (gotTheLock) {
  app.on('second-instance', (e, argv) => {
    // Someone tried to run a second instance, we should focus our window.

    // Protocol handler for win32
    // argv: An array of the second instance’s (command line / deep linked) arguments
    if (process.platform === 'win32') {
      // Keep only command line / deep linked arguments
      deeplinkingUrl = argv.slice(1);
    }

    logEverywhere(`app.makeSingleInstance# ${deeplinkingUrl}`);

    if (mainWindow) {
      if (mainWindow.isMinimized()) mainWindow.restore();
      mainWindow.focus();
    }
  });
} else {
  app.quit();
  return;
}

function createWindow() {
  // Create the browser window.
  let appIcon;
  if (fs.existsSync(`${__dirname}/img/app.png`)) {
    appIcon = `${__dirname}/img/app.png`;
  } else if (fs.existsSync(`${__dirname}/img/icon.png`)) {
    appIcon = `${__dirname}/img/icon.png`;
  } else {
    appIcon = `${__dirname}/img/logo.png`;
  }

  const browserWindowOpts = { ...cdvElectronSettings.browserWindow, icon: appIcon };
  mainWindow = new BrowserWindow(browserWindowOpts);

  // and load the index.html of the app.
  // TODO: possibly get this data from config.xml
  mainWindow.loadURL(`file://${__dirname}/index.html`);
  mainWindow.webContents.on('did-finish-load', () => {
    mainWindow.webContents.send('window-id', mainWindow.id);
  });

  // Open the DevTools.
  if (cdvElectronSettings.browserWindow.webPreferences.devTools) {
    mainWindow.webContents.openDevTools();
  }

  // Protocol handler for win32
  if (process.platform === 'win32') {
    // Keep only command line / deep linked arguments
    deeplinkingUrl = process.argv.slice(1);
  }
  logEverywhere(`createWindow# ${deeplinkingUrl} ${appIcon}`);

  // Emitted when the window is closed.
  mainWindow.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

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
  if (mainWindow === null) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

if (!app.isDefaultProtocolClient('girbil')) {
  // Define custom protocol handler. Deep linking works on packaged versions of the application!
  app.setAsDefaultProtocolClient('girbil');
}

app.on('will-finish-launching', () => {
  // Protocol handler for osx
  app.on('open-url', (event, url) => {
    event.preventDefault();
    deeplinkingUrl = url;

    if (deeplinkingUrl && deeplinkingUrl.match('token=')) {
      setToken(deeplinkingUrl.split('token=')[1]);
    }
    logEverywhere(`open-url# ${deeplinkingUrl}`);
  });
});
