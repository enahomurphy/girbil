import {
  Entity, PrimaryGeneratedColumn, Column, OneToOne, CreateDateColumn, JoinColumn,
} from 'typeorm';
import { Field, ObjectType } from 'type-graphql';

import { User } from './user';
import { Channel } from './channel';

export enum ConversationType {
  USER = 'user',
  CHANNEL = 'channel',
}

@Entity('conversations')
@ObjectType()
export class Conversation {
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

  @Field()
  @Column({
    name: 'organization_id',
    type: 'uuid',
  })
  organizationId?: string;

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
  receiverType: string

  @OneToOne(() => User, { eager: true })
  @JoinColumn({
    name: 'creator_id',
    referencedColumnName: 'id',
  })
  creator?: User

  @Field(() => User, { nullable: true })
  @OneToOne(() => User, { eager: true })
  @JoinColumn({
    name: 'receiver_id',
    referencedColumnName: 'id',
  })
  receiver?: User

  @Field(() => Channel, { nullable: true })
  @OneToOne(() => Channel, { eager: true })
  @JoinColumn({
    name: 'channel_id',
    referencedColumnName: 'id',
  })
  channel?: Channel

  @Field({ nullable: true })
  @Column({
    name: 'user_id',
  })
  userId: string;
}
