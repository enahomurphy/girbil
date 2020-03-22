import { createMethodDecorator } from 'type-graphql';
import { ContextType } from '../../interfaces';

export class NotFoundError extends Error {
  constructor(message = "The resource you're trying to access does not exist") {
    super(message);
  }
}

export const ErrorHandler = createMethodDecorator<ContextType>(async ({ context }) => {
  context.res.status(404);
  throw new NotFoundError();
});

export const notFoundError = (context, message?: string): void => {
  context.res.status(403);
  throw new NotFoundError(message);
};

export const unAuthError = (context, message?: string): void => {
  context.res.status(403);
  throw new NotFoundError(message || 'You are not allowed to access this resource');
};
