import { ArgsType, Field } from 'type-graphql';
import { IsUUID } from 'class-validator';

@ArgsType()
export class UserIDArgs {
  @Field()
  @IsUUID()
  userId?: string
}
