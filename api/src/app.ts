import 'reflect-metadata';
import Express from 'express';
import cors from 'cors';
import compression from 'compression';
import passport from 'passport';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import socketIO, { Server as SocketIOServer } from 'socket.io';
import { createServer, Server as HTTPServer } from 'http';


import { ContextType, ContextArgs } from './interfaces';
import middleware, { authorized } from './middleware';
import { keys } from './config';
import logger from './utils/logger';
import socketHandler from './socket';
import controller from './controller';

const resolvers = keys.environment != 'development'
  ? [`${__dirname}/modules/**/*.resolver.ts`]
  : [`${__dirname}/modules/**/*.resolver.js`]


const App = async (): Promise<string | undefined> => {
  try {
    const schema = await buildSchema({
      resolvers: resolvers,
      authChecker: authorized,
      authMode: 'error',
      dateScalarMode: 'timestamp',
    });

    const apolloServer = new ApolloServer({
      schema,
      context: ({ req, res }: ContextArgs): ContextType => ({ req, res, user: req.user }),
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
    const io: SocketIOServer = socketIO(httpServer);

    controller(app);
    socketHandler(io);

    httpServer.listen(keys.port, () => {
      logger.info(`server started on http://localhost:${keys.port}/graphql`);
    });
  } catch (error) {
    logger.error(error);
  }

  return Promise.resolve('done');
};

export default App;
