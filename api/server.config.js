/* eslint-disable @typescript-eslint/camelcase */
module.exports = {
  apps: [
    {
      name: 'Girbil Api',
      script: './dist/server.js',
      ignore_watch: ['node_modules'],
      exec_mode: 'cluster',
      watch: true,
      env: {
        PORT: 8081,
      },
    },
  ],
};
