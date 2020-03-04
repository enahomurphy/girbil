import {
  Entity, PrimaryGeneratedColumn, Column, OneToOne, CreateDateColumn, JoinColumn, UpdateDateColumn,
} from 'typeorm';
import { Field, ObjectType } from 'type-graphql';

import { User } from './user';
import { Channel } from './channel';

@Entity('conversations')
@ObjectType()
export class Conversation {
  @PrimaryGeneratedColumn('uuid')
  readonly id?: string;

  @Field()
  @Column({
    name: 'creator_id',
    type: 'uuid',
  })
  creatorId?: string;

  @Field()
  @Column({
    name: 'receiver_id',
    type: 'uuid',
  })
  receiverId?: string;

  @Field()
  @Column({
    name: 'channel_id',
    type: 'uuid',
  })
  channelId?: string;

  @Field(() => User)
  @OneToOne(() => User)
  @JoinColumn({
    name: 'creator_id',
    referencedColumnName: 'id',
  })
  creator?: User

  @Field(() => User)
  @OneToOne('Channel')
  @JoinColumn({
    name: 'receiver_id',
    referencedColumnName: 'id',
  })
  receiver?: User

  @OneToOne('Channel')
  @JoinColumn({
    name: 'channel_id',
    referencedColumnName: 'id',
  })
  channel?: Channel


  @Field()
  @CreateDateColumn({
    name: 'created_at',
    default: new Date(),
  })
  createdAt?: Date;

  @Field()
  @UpdateDateColumn({
    name: 'updated_at',
    default: new Date(),
  })
  updatedAt?: Date;
}
