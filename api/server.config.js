/* eslint-disable @typescript-eslint/camelcase */
module.exports = {
  apps: [
    {
      name: 'Girbil Api',
      script: './server.ts',
      interpreter: 'node_modules/.bin/ts-node',
      ignore_watch: ['node_modules'],
      instances: 2,
      // exec_mode: 'cluster',
      watch: true,
      env: {
        PORT: 8081,
      },
    },
  ],
};
