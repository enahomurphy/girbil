import {
  Entity, PrimaryGeneratedColumn, Column, OneToOne, CreateDateColumn,
} from 'typeorm';
import { Field, ObjectType } from 'type-graphql';

import User from './user';

export enum MessageType {
  TEXT = 'text',
  VIDEO = 'video',
}

@Entity()
@ObjectType()
export default class Group {
  @PrimaryGeneratedColumn()
  readonly id: string;

  @Field()
  @Column({
    type: 'enum',
    enum: MessageType,
    default: MessageType.VIDEO,
  })
  type: MessageType;

  @Field()
  @OneToOne(() => User)
  @Column()
  userId?: string;

  @Field()
  @Column()
  url?: string;

  @CreateDateColumn()
  @Field()
  createdAt?: Date;

  @Column()
  @Field()
  conversationId?: string;
}
