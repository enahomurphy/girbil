import 'reflect-metadata';
import Express from 'express';
import cors from 'cors';
import compression from 'compression';
import passport from 'passport';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';

import logger from './utils/logger';
import middleware, { passportMiddleware } from './middleware';
import routes from './routes';

interface Context {
  req: Express.Request;
}

interface ContextArgs {
  req: Express.Request;
}

const App = async (): Promise<string | undefined> => {
  try {
    const schema = await buildSchema({
      resolvers: [`${__dirname}/modules/**/*resolver.ts`],
      authChecker: ({ context: { req } }) => !!req.session.userId,
    });

    const apolloServer = new ApolloServer({
      schema,
      context: ({ req }: ContextArgs): Context => ({ req }),
    });

    const app: Express.Application = Express();
    app.use(Express.json());
    app.use(compression());
    app.use(cors());
    app.use((req: Express.Request, res: Express.Response, next: Express.NextFunction) => {
      passportMiddleware(passport);
      next();
    });
    app.use(passport.initialize());
    app.use(middleware);
    routes(app, passport);

    apolloServer.applyMiddleware({ app });

    app.listen(8081, () => {
      logger.info('server started on http://localhost:4000/graphql');
    });
  } catch (error) {
    logger.error(error.message);
  }

  return Promise.resolve('done');
};

export default App;
