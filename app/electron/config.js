/* eslint-disable import/no-extraneous-dependencies */
const electron = require('electron');

const { icons } = require('./utils');

module.exports = () => {
  const { bounds } = electron.screen.getPrimaryDisplay();
  const width = 376;
  const height = 812;

  return {
    tray: {
      icon: icons.getTrayIcon(),
    },
    browserWindow: {
      icon: icons.getAppIcon(),
      width,
      height,
      x: bounds.width - width,
      y: bounds.height - height,
      resizable: false,
      alwaysOnTop: false,
      fullscreenable: false,
      title: 'Girbil',
      frame: false,
      transparent: true,
      backgroundColor: '#00222222',
      webPreferences: {
        nodeIntegration: process.env.NODE_ENV !== 'production',
        devTools: process.env.NODE_ENV !== 'production',
        preload: `${__dirname}/preload.js`,
      },
    },
  };
};
