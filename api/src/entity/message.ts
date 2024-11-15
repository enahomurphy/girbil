import {
  Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToOne, JoinColumn,
} from 'typeorm';
import { Field, ObjectType, Int } from 'type-graphql';
import { User } from '.';

@ObjectType()
class Reaction {
  @Field({ nullable: true })
  userReacted: boolean

  @Field({ nullable: true })
  reaction: string

  @Field({ nullable: true })
  count: number
}

@Entity('messages')
@ObjectType()
export class Message {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column({
    name: 'sender_id',
    type: 'uuid',
  })
  senderId?: string;

  @Column({
    name: 'conversation_id',
    type: 'uuid',
  })
  @Field()
  conversationId?: string;

  @Column({
    name: 'parent_id',
    type: 'uuid',
    nullable: true,
  })
  @Field({ nullable: true })
  parentId?: string;

  @Field()
  @Column()
  video?: string;

  @Field()
  @Column({
    nullable: true,
  })
  thumbnail?: string;

  @Field()
  @Column({
    name: 'note',
    type: 'text',
    nullable: true,
  })
  note?: string;

  @Field(() => [Reaction], { nullable: true })
  @Column({ type: 'json', array: true })
  reactions?: Reaction[] = []

  @Field(() => String)
  state = 'done';

  @Column({ type: 'uuid', array: true })
  read: string[];

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp with time zone',
  })
  @Field()
  createdAt?: Date;

  @Field(() => Int, { nullable: true })
  @Column({
    type: 'integer',
    select: false,
    insert: false,
    readonly: true,
  })
  replyCount = 0;

  @Field(() => Boolean, { nullable: true, description: 'Returns true if the user requesting the message has read it' })
  @Column({
    type: 'boolean',
    select: false,
    insert: false,
    readonly: true,
  })
  hasRead = false;

  @Field(() => User)
  @OneToOne(() => User, { eager: false })
  @JoinColumn({
    name: 'sender_id',
    referencedColumnName: 'id',
  })
  sender?: User
}
