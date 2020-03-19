import {
  Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToOne, JoinColumn,
} from 'typeorm';
import { Field, ObjectType, Int } from 'type-graphql';
import { User } from '.';

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

  @Field()
  readonly state: string = 'done';

  @Column({ type: 'uuid', array: true })
  read: string[];

  @CreateDateColumn({
    name: 'created_at',
  })
  @Field()
  createdAt?: Date;

  @Field(() => Int, { nullable: true })
  @Column({
    select: false,
    insert: false,
    readonly: true,
  })
  replyCount?: number;

  @Field(() => User)
  @OneToOne(() => User, { eager: true })
  @JoinColumn({
    name: 'sender_id',
    referencedColumnName: 'id',
  })
  sender?: User
}
