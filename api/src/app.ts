import 'reflect-metadata';
import Express from 'express';
import cors from 'cors';
import compression from 'compression';
import passport from 'passport';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';

import { ContextType, ContextArgs } from './interfaces';
import { keys } from './config';
import logger from './utils/logger';
import middleware, { authorized } from './middleware';

const App = async (): Promise<string | undefined> => {
  try {
    const schema = await buildSchema({
      resolvers: [`${__dirname}/modules/**/*.resolver.ts`],
      authChecker: authorized,
      authMode: 'error',
    });

    const apolloServer = new ApolloServer({
      schema,
      context: ({ req, res }: ContextArgs): ContextType => ({ req, res, user: req.user }),
    });

    const app: Express.Application = Express();
    app.use(Express.json());
    app.use(Express.urlencoded({ extended: false }));
    app.use(compression());
    app.use(cors());
    app.use(passport.initialize());
    app.use(middleware);

    apolloServer.applyMiddleware({ app });

    app.listen(keys.port, () => {
      logger.info(`server started on http://localhost:${keys.port}/graphql`);
    });
  } catch (error) {
    logger.error(error);
  }

  return Promise.resolve('done');
};

export default App;
