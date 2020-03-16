import { Field, ObjectType, Int } from 'type-graphql';
import { plainToClass } from 'class-transformer';

import { User } from '../../entity';

@ObjectType()
export class ChannelMembers {
  @Field(() => User, { nullable: true })
  members: User[]

  @Field(() => Int, { nullable: true })
  count: number

  static create(members: User[], count: number): AuthType {
    return plainToClass(ChannelMembers, { members, count });
  }
}
