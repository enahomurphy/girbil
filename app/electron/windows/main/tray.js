const { Tray } = require('electron');

module.exports = (window, icon) => {
  const tray = new Tray(icon);
  tray.on('click', () => {
    window.show();
  });

  tray.setToolTip('giribl');
};
