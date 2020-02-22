import 'reflect-metadata';
import Express from 'express';
import cors from 'cors';
import compression from 'compression';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { createConnection } from 'typeorm';

import logger from './utils/logger';

interface Context {
  req: Express.Request;
}

interface ContextArgs {
  req: Express.Request;
}

const main = async (): Promise<string | undefined> => {
  try {
    await createConnection();

    const schema = await buildSchema({
      resolvers: [`${__dirname}/modules/**/*resolver.ts`],
      authChecker: ({ context: { req } }) => !!req.session.userId,
    });

    const apolloServer = new ApolloServer({
      schema,
      context: ({ req }: ContextArgs): Context => ({ req }),
    });

    const app = Express();
    app.use(compression());
    app.use(
      cors({
        credentials: true,
        origin: 'http://localhost:3000',
      }),
    );

    apolloServer.applyMiddleware({ app });

    app.listen(8081, () => {
      logger.info('server started on http://localhost:4000/graphql');
    });
  } catch (error) {
    logger.error(error);
  }

  return Promise.resolve('done');
};

main();
