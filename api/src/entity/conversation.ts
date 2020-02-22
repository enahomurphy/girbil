import {
  Entity, PrimaryGeneratedColumn, Column, OneToOne, CreateDateColumn,
} from 'typeorm';
import { Field, ObjectType } from 'type-graphql';

import User from './user';

export enum ConversationType {
  USER = 'user',
  GROUP = 'group',
}

@Entity()
@ObjectType()
export default class Group {
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @Field()
  @Column({
    type: 'enum',
    enum: ConversationType,
    default: ConversationType.USER,
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
  @Column()
  text?: string;

  @CreateDateColumn()
  @Field()
  createdAt?: Date;

  @Column()
  @Field()
  conversationId?: string;
}
