import { createConnection } from 'typeorm';

import app from './app';

createConnection().then(() => {
  app();
});
