import {
  Entity, PrimaryGeneratedColumn, Column, OneToOne, CreateDateColumn,
} from 'typeorm';
import { Field, ObjectType } from 'type-graphql';

import { User } from './index';

export enum MessageType {
  TEXT = 'text',
  VIDEO = 'video',
}

@Entity('messages')
@ObjectType()
export class Message {
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
    nullable: true,
  })
  thumbnail?: string;

  @Field()
  @Column({
    name: 'text',
    type: 'text',
    nullable: true,
  })
  text?: string;

  @CreateDateColumn({
    name: 'created_at',
  })
  @Field()
  createdAt?: Date;

  @Column({
    name: 'conversation_id',
    type: 'uuid',
  })
  @Field()
  conversationId?: string;
}
