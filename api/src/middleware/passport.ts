import passportLocal from 'passport-local';
import JwtStrategy from 'passport-jwt';
import Express from 'express';

import { getCustomRepository } from 'typeorm';

import { isValidPassword } from '../utils/password';
import { UserRepo } from '../repo';
import keys from '../config/keys';
import { options } from '../utils/jwt';

const Passport = (passport): void => {
  const userRepo = getCustomRepository(UserRepo);

  passport.use(
    'signup',
    new passportLocal.Strategy(
      {
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true,
      },
      async (req: Express.Request, username: string, password: string, done: any): Promise<any> => {
        try {
          const user = await userRepo.findByEmail(username);

          if (user) {
            return done(null, user);
          }

          const insertedUser = await userRepo.createUser(
            username,
            req.body.name || '',
            password,
          );

          delete insertedUser.password;
          return done(null, insertedUser);
        } catch (error) {
          return done(error);
        }
      },
    ),
  );

  passport.use(
    'login',
    new passportLocal.Strategy(
      {
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: false,
      },
      async (username: string, password: string, done: any): Promise<void> => {
        try {
          const user = await userRepo.findByEmail(username);
          if (!user || !isValidPassword(password, user.password)) {
            return done(null, false, { message: 'Invalid email or password' });
          }

          delete user.password;
          return done(null, user);
        } catch (error) {
          return done(error);
        }
      },
    ),
  );

  const option = {
    jwtFromRequest: JwtStrategy.ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: keys.authSecrete,
    ...options,
  };

  passport.use(new JwtStrategy.Strategy(option, async (payload, done): Promise<any> => {
    try {
      const user = await userRepo.findOne({ id: payload.id });

      if (user) {
        done(null, user);
      } else {
        done(null, false);
      }
    } catch (error) {
      done(error, false);
    }
  }));
};

export default Passport;
