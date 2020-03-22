import { User } from 'src/entity';
import Express from 'express';

export interface ContextType {
  user: User;
  req: Express.Request;
  res: Express.Response;
}

export type Response = Express.Response

export interface Request extends Express.Request {
  user: User;
}

export interface ContextArgs {
  req: Request;
  res: Response;
}
