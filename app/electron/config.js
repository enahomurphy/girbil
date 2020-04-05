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
        nodeIntegration: false,
        devTools: true,
        preload: `${__dirname}/preload.js`,
      },
    },
  };
};
