import { createConnection } from 'typeorm';
import app from './src/app';

createConnection().then(() => {
  app();
});
