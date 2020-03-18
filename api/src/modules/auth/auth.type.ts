/* eslint-disable max-classes-per-file */
import { Field, ObjectType } from 'type-graphql';
import { plainToClass } from 'class-transformer';
import { Organization, User } from '../../entity';

@ObjectType()
export class AuthType {
  @Field()
  token: string;

  @Field({ nullable: true })
  user?: User

  @Field(() => [Organization], { nullable: true })
  organizations?: Organization[]

  static createAuth(token: string, user?: User, organizations?: Organization): AuthType {
    return plainToClass(AuthType, { token, user, organizations });
  }
}

@ObjectType()
export class InviteOrganization {
  @Field()
  id: string;

  @Field({ nullable: true })
  domain?: string

  @Field()
  name?: string

  @Field()
  avatar?: string
}
