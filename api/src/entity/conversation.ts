import {
  Entity, PrimaryGeneratedColumn, Column, OneToOne, CreateDateColumn, JoinColumn,
} from 'typeorm';
import { Field, ObjectType } from 'type-graphql';

import { User } from '.';
import { Channel } from './channel';
import { Workspace } from './workspace';

export enum ConversationType {
  USER = 'user',
  CHANNEL = 'channel',
}

@Entity('conversations')
@ObjectType()
export class Conversation {
  @PrimaryGeneratedColumn('uuid')
  readonly id?: string;

  @Field()
  @Column({
    name: 'sender_id',
    type: 'uuid',
  })
  senderId?: string;

  @Field()
  @Column({
    name: 'receiver_id',
    type: 'uuid',
  })
  receiverId?: string;

  @Field(() => User)
  @Column({
    name: 'workspace_id',
    type: 'uuid',
  })
  workspaceId?: string;

  @Field(() => User)
  @OneToOne(() => User)
  @JoinColumn({
    name: 'sender_id',
    referencedColumnName: 'id',
  })
  creator?: User

  @Field(() => User)
  @OneToOne(() => User)
  @JoinColumn({
    name: 'receiver_id',
    referencedColumnName: 'id',
  })
  receiver?: User

  @OneToOne(() => Channel)
  @JoinColumn({
    name: 'receiver_id',
    referencedColumnName: 'id',
  })
  channel: Channel

  @Field(() => Workspace)
  @OneToOne(() => Workspace)
  @JoinColumn({
    name: 'workspace_id',
    referencedColumnName: 'id',
  })
  workspace: Workspace

  @Field()
  @Column({
    type: 'enum',
    enum: ConversationType,
    default: ConversationType.USER,
    enumName: 'conversation_type',
  })
  type: ConversationType;

  @Field()
  @CreateDateColumn({
    name: 'created_at',
    default: new Date(),
  })
  createdAt?: Date;
}
