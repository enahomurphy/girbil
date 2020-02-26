import * as jwt from 'jsonwebtoken';
import { User } from 'src/entity';

export const options = {
  issuer: 'girbil.com',
  audience: 'girbil.com',
};

export const sign = (payload: User): string => {
  const setting = {
    issuer: 'girbil.com',
    audience: 'girbil.com',
    ...payload,
  };

  return jwt.sign(setting, process.env.AUTH_SECRET);
};
