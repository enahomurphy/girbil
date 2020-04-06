import 'reflect-metadata';
import Express from 'express';
import cors from 'cors';
import compression from 'compression';
import passport from 'passport';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { createServer, Server as HTTPServer } from 'http';


import { ContextType, ContextArgs } from './interfaces';
import middleware, { authorized } from './middleware';
import { keys } from './config';
import logger from './utils/logger';
import controller from './controller';
import { initializeSocketQueue } from './services/socket';
import { queue } from './services/redis';

const resolvers = keys.environment === 'development'
  ? [`${__dirname}/modules/**/*.resolver.ts`]
  : [`${__dirname}/modules/**/*.resolver.js`];

const App = async (): Promise<string | undefined> => {
  try {
    const schema = await buildSchema({
      resolvers,
      authChecker: authorized,
      authMode: 'error',
      dateScalarMode: 'timestamp',
    });

    const apolloServer = new ApolloServer({
      schema,
      context: ({ req, res }: ContextArgs): ContextType => ({
        req,
        res,
        user: req.user,
        timezone: req.get('timezone'),
      }),
    });

    const app: Express.Application = Express();
    app.use(Express.json({ limit: '50mb' }));
    app.use(Express.urlencoded({ extended: false }));
    app.use(compression());
    app.use(cors());
    app.use(passport.initialize());
    app.use(middleware);

    apolloServer.applyMiddleware({ app });
    const httpServer: HTTPServer = createServer(app);
    controller(app);
    initializeSocketQueue(queue);

    httpServer.listen(keys.port, () => {
      logger.info(`server started on http://localhost:${keys.port}/graphql`);
    });
  } catch (error) {
    logger.error(error);
  }

  return Promise.resolve('done');
};

export default App;
