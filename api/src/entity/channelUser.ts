import { Entity, PrimaryColumn } from 'typeorm';
import { Field, ObjectType } from 'type-graphql';

@Entity('channel_users')
@ObjectType()
export class ChannelUsers {
  @Field()
  @PrimaryColumn({
    type: 'uuid',
    name: 'user_id',
  })
  userId?: string;

  @Field()
  @PrimaryColumn({
    name: 'channel_id',
    type: 'uuid',
  })
  channelId?: string;
}
