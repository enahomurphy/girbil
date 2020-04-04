module.exports = (window, log) => {
  if (window && window.webContents) {
    window.webContents.executeJavaScript(`console.log("${log}")`);
  }
};
