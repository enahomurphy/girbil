import {
  Entity, PrimaryGeneratedColumn, Column, OneToOne, CreateDateColumn,
} from 'typeorm';
import { Field, ObjectType } from 'type-graphql';

import User from './user';

export enum MessageType {
  TEXT = 'text',
  VIDEO = 'video',
}

@Entity('messages')
@ObjectType()
export default class Message {
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @Field()
  @Column({
    type: 'enum',
    enum: MessageType,
    default: MessageType.VIDEO,
    enumName: 'message_type',
  })
  type: MessageType;

  @Field()
  @OneToOne(() => User)
  @Column({
    name: 'user_id',
    type: 'uuid',
  })
  userId?: string;

  @Field()
  @Column()
  url?: string;

  @Field()
  @Column({
    name: 'text',
    type: 'text',
  })
  text?: boolean;

  @CreateDateColumn()
  @Field({
    name: 'created_at',
  })
  createdAt?: Date;

  @Column({
    name: 'conversation_id',
    type: 'uuid',
  })
  @Field()
  conversationId?: string;
}
