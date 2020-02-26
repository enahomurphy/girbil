import {
  Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToOne, JoinColumn,
} from 'typeorm';
import { Field, ObjectType } from 'type-graphql';
import { Conversation } from './conversation';
import { User } from './user';

@Entity('messages')
@ObjectType()
export class Message {
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @Field()
  @Column({
    name: 'user_id',
    type: 'uuid',
  })
  userId?: string;

  @Field(() => User)
  @OneToOne(() => User)
  @JoinColumn({
    name: 'user_id',
    referencedColumnName: 'id',
  })
  sender?: User

  @Column({
    name: 'conversation_id',
    type: 'uuid',
  })
  @Field()
  conversationId?: string;

  @Field(() => Conversation)
  @OneToOne(() => Conversation)
  @JoinColumn({
    name: 'conversation_id',
    referencedColumnName: 'id',
  })
  workspace: Conversation;

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
}
