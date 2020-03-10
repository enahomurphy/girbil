import {
  MiddlewareFn, createMethodDecorator,
} from 'type-graphql';

export class NotFoundError extends Error {
  constructor(message = "The resource you're trying to access does not exist") {
    super(message);
  }
}

export const ErrorHandler: MiddlewareFn = createMethodDecorator(async ({ context }) => {
  context.res.status(404);
  throw new NotFoundError();
});


export const notFoundError = (context, message?: string): void => {
  context.res.status(403);
  throw new NotFoundError(message);
};
