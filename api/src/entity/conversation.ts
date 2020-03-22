
import {
  Entity, PrimaryGeneratedColumn, Column, OneToOne, CreateDateColumn, JoinColumn,
} from 'typeorm';
import { Field, ObjectType, Int } from 'type-graphql';

import { User } from './user';
import { Channel } from './channel';

export enum ConversationType {
  USER = 'user',
  CHANNEL = 'channel',
}

@Entity('conversations')
@ObjectType()
export class Conversation {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  readonly id?: string;

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

  @Column({
    name: 'organization_id',
    type: 'uuid',
  })
  organizationId?: string;

  @Column('boolean')
  open?: boolean;

  @Field()
  @CreateDateColumn({
    name: 'created_at',
    default: new Date(),
  })
  createdAt?: Date;

  @Column({
    type: 'enum',
    enum: ConversationType,
    default: ConversationType.USER,
    enumName: 'receiver_type',
    name: 'receiver_type',
  })
  @Field()
  receiverType: ConversationType

  @Field(() => User, { nullable: true })
  @OneToOne(() => User)
  @JoinColumn({
    name: 'creator_id',
    referencedColumnName: 'id',
  })
  creator?: User

  @Field(() => User, { nullable: true })
  @OneToOne(() => User)
  @JoinColumn({
    name: 'receiver_id',
    referencedColumnName: 'id',
  })
  receiver?: User

  @Field(() => Int)
  @Column({
    select: false,
    insert: false,
    readonly: true,
  })
  unread?: number;

  @Field(() => Channel, { nullable: true })
  @OneToOne(() => Channel)
  @JoinColumn({
    name: 'receiver_id',
    referencedColumnName: 'id',
  })
  channel?: Channel

  @Field({ nullable: true })
  userId?: string;
}
