import {
  ViewEntity, Column, OneToOne, JoinColumn,
} from 'typeorm';
import { Field } from 'type-graphql';

import { Conversation } from './conversation';
import { Channel } from './channel';

@ViewEntity({ name: 'user_conversation_view' })
export class UserConversations extends Conversation {
  @Field({ nullable: true })
  @Column({
    name: 'user_id',
  })
  userId: string;

  @Field(() => Channel, { nullable: true })
  @OneToOne(() => Channel)
  @JoinColumn({
    name: 'channel_id',
    referencedColumnName: 'id',
  })
  channel?: Channel
}
