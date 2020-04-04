# Electron config
this holds our custom cordova electron configuration. This file exit because subsequent update to cordova electron will overwrite our changes config. And the cordova folder is excluded from git 


### NOTE
Every custom changes to cordova electron should be reflected in this file as wel This allows us keep track of changes and also up

Before building an electron binary, this files needs to be copied to their respective directory
- cdv-electron-main.js -> /cordova/platforms/electron/platform_www/cdv-electron-main.js : electron main process;
- preload.js -> /cordova/platforms/electron/platform_www/preload.js: expose electron api to the window object;
- build.json -> /cordova/platforms/electron/build.json: electron build configuration
- electron-settings.json -> /cordova/platforms/electron/electron-settings.json: electron window configuration
