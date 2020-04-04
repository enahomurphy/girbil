const { join } = require('path');
const { app, BrowserWindow } = require('electron');

const { logger } = require('../utils');
const getConfig = require('../config');

// we use this method to allow users open the app from the web
// only tested on safari and chrome
// most of the code and inspiration was gotten from
// https://github.com/oikonomopo/electron-deep-linking-mac-win
const browserLink = (window) => {
  const lock = app.requestSingleInstanceLock();

  if (!lock) {
    app.quit();
    return;
  }

  // Someone tried to run a second instance, we should focus our window.
  app.on('second-instance', (e, argv) => {
    // Protocol handler for win32
    // argv: An array of the second instance’s (command line / deep linked) arguments
    if (process.platform === 'win32') {
      // Keep only command line / deep linked arguments
      const link = argv.slice(1);
      logger(window, link);
      // @TODO handle link for windows
    }

    if (window && window.isMinimized()) {
      window.restore();
      window.focus();
    } else if (window) {
      window.focus();
    }
  });
};

module.exports = () => {
  const { browserWindow: config } = getConfig();
  let window = new BrowserWindow(config);

  window.loadURL(join(`file://${__dirname}`, '../index.html'));

  window.webContents.on('did-finish-load', () => {
    window.webContents.send('window-id', window.id);
  });

  window.on('closed', () => {
    window = null;
  });

  browserLink(window);

  if (config.webPreferences.devTools) {
    window.webContents.openDevTools();
  }

  return window;
};
