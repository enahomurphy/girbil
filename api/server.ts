import { createConnection } from 'typeorm';
import app from './src/app';
import logger from './src/utils/logger';

createConnection()
  .then(() => {
    app();
  })
  .catch((error) => {
    logger.error(error);
  });
