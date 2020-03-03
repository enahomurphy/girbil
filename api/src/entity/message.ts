import {
  Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToOne, JoinColumn,
} from 'typeorm';
import { Field, ObjectType } from 'type-graphql';
import { User } from '.';

@Entity('messages')
@ObjectType()
export class Message {
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @Field()
  @Column({
    name: 'sender_id',
    type: 'uuid',
  })
  senderId?: string;

  @Field(() => User)
  @OneToOne(() => User)
  @JoinColumn({
    name: 'sender_id',
    referencedColumnName: 'id',
  })
  sender?: User

  @Column({
    name: 'conversation_id',
    type: 'uuid',
  })
  @Field()
  conversationId?: string;

  @Column({
    name: 'organization_id',
    type: 'uuid',
  })
  @Field()
  organizationId?: string;

  @Column({
    name: 'parent_id',
    type: 'uuid',
  })
  @Field()
  parent_id?: string;

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
  note?: string;

  @CreateDateColumn({
    name: 'created_at',
  })
  @Field()
  createdAt?: Date;
}
