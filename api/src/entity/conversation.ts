import {
  Entity, PrimaryGeneratedColumn, Column, OneToOne, CreateDateColumn,
} from 'typeorm';
import { Field, ObjectType } from 'type-graphql';

import User from './user';

export enum ConversationType {
  USER = 'user',
  CHANNEL = 'channel',
}

@Entity('conversations')
@ObjectType()
export default class Conversation {
  @PrimaryGeneratedColumn('uuid')
  readonly id?: string;

  @Field()
  @Column({
    type: 'enum',
    enum: ConversationType,
    default: ConversationType.USER,
    enumName: 'conversation_type',
  })
  type: ConversationType;

  @Field()
  @OneToOne(() => User)
  @Column('uuid')
  sender?: string;

  @Field()
  @OneToOne(() => User)
  @Column('uuid')
  receiver?: string;

  @Field()
  @Column('text')
  text?: string;

  @CreateDateColumn({
    name: 'created_at',
  })
  @Field()
  createdAt?: Date;
}
