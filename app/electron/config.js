const electron = require('electron');

const { getAppIcon } = require('./utils');


module.exports = () => {
  const { bounds } = electron.screen.getPrimaryDisplay();
  const width = 376;
  const height = 812;

  return {
    browserWindow: {
      icon: getAppIcon(),
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
        devTools: false,
        preload: `${__dirname}/preload.js`,
      },
    },
  };
};
