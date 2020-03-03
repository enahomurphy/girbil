import { User } from 'src/entity';
import Express from 'express';

export interface ContextType {
  user: User;
  req: Express.Request;
  res: Express.Response;
}

export interface ContextArgs {
  req: Express.Request;
}
