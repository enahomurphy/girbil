import Express from 'express';

import { User } from '../entity';

export interface ContextType {
  user: User;
  req: Express.Request;
  res: Express.Response;
  timezone: string;
}

export type Response = Express.Response

export interface Request extends Express.Request {
  user: User;
}

export interface ContextArgs {
  req: Request;
  res: Response;
}
