import { createConnection } from 'typeorm';
import app from './src/app';
import logger from './src/utils/logger';

const main = async (): void => {
  try {
    await createConnection();
    app();
  } catch (error) {
    logger.error(error);
  }
};

main();
