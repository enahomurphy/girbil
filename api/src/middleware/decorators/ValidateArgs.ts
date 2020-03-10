import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import {
  NextFn, ClassType, ArgumentValidationError, createMethodDecorator,
} from 'type-graphql';

export function ValidateArgs<T extends object>(type: ClassType<T>): NextFn {
  return createMethodDecorator(async ({ args }, next) => {
    const instance = plainToClass(type, args);
    const validationErrors = await validate(instance);
    if (validationErrors.length > 0) {
      throw new ArgumentValidationError(validationErrors);
    }
    return next();
  });
}
