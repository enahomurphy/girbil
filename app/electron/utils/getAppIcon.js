const fs = require('fs');

module.exports = () => {
  let appIcon;

  if (fs.existsSync(`${__dirname}/img/app.png`)) {
    appIcon = `${__dirname}/img/app.png`;
  } else if (fs.existsSync(`${__dirname}/img/icon.png`)) {
    appIcon = `${__dirname}/img/icon.png`;
  } else {
    appIcon = `${__dirname}/img/logo.png`;
  }

  return appIcon;
};
