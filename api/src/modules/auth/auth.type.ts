/* eslint-disable max-classes-per-file */
import { Field, ObjectType } from 'type-graphql';
import { plainToClass } from 'class-transformer';

@ObjectType()
export class AuthType {
  @Field()
  token: string;

  static createAuth(token: string): AuthType {
    return plainToClass(AuthType, { token });
  }
}
