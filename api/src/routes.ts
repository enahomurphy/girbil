import Express from 'express';

import { sign } from './utils/jwt';

const handleToken = (
  req, res,
): Express.Response => res.status(200).json(sign(req.user));

export default (app: Express.Application, passport): void => {
  app.post(
    '/login',
    passport.authenticate('login', { session: false }),
    handleToken,
  );
  app.post(
    '/signup',
    passport.authenticate('signup', { session: false }),
    handleToken,
  );
};
