module.exports = (window, token) => {
  if (window && window.webContents) {
    window.webContents.executeJavaScript(`
      localStorage.setItem('gb-token', '${token}');
      window.location.reload();
    `);
  }
};
