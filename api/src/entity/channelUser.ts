
import {
  Entity, PrimaryColumn, OneToOne, JoinColumn,
} from 'typeorm';
import { Field, ObjectType } from 'type-graphql';
import { User } from '.';

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

  @OneToOne(() => User)
  @JoinColumn({
    name: 'user_id',
    referencedColumnName: 'id',
  })
  user?: User;
}
