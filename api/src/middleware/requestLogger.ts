import { Request, Response } from 'express';

const loggerMiddleware = (req: Request, resp: Response, next): void => {
  next();
};

export default loggerMiddleware;
