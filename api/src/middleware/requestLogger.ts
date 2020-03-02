import { Request, Response } from 'express';

import logger from '../utils/logger';

const loggerMiddleware = (req: Request, resp: Response, next): void => {
  logger.info('Request logged:', req.method, req.path, req.headers, req.query);
  next();
};

export default loggerMiddleware;
