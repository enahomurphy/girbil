import * as jwt from 'jsonwebtoken';
import { User } from '../entity';
import { keys } from '../config';

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

  return jwt.sign(setting, keys.authSecret);
};

export const decode = (token?: string): User => {
  try {
    if (token) {
      return jwt.verify(token, keys.authSecret);
    }
    return null;
  } catch (err) {
    return null;
  }
};
