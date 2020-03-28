import { Field, ObjectType, Int } from 'type-graphql';
import { plainToClass } from 'class-transformer';

import { User } from '../../entity';
import { ChannelMembers as ChannelMembersInterface } from '../../interfaces/channel';

@ObjectType()
export class ChannelMembers implements ChannelMembersInterface {
  @Field(() => User, { nullable: true })
  members: User[]

  @Field(() => Int, { nullable: true })
  count: number

  static create(members: User[], count: number): ChannelMembers {
    return plainToClass(ChannelMembers, { members, count });
  }
}
