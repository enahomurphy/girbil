const { join } = require('path');
const { BrowserWindow } = require('electron');

const getConfig = require('../config');


module.exports = () => {
  const { browserWindow: config } = getConfig();
  const splash = new BrowserWindow({ ...config, show: true, transparent: false });

  splash.loadURL(join(`file://${__dirname}`, '../splash.html'));

  return splash;
};
