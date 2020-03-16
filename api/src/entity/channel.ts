import {
  Entity, PrimaryGeneratedColumn, Column, CreateDateColumn,
  OneToOne, UpdateDateColumn, ManyToMany, JoinTable, JoinColumn, ManyToOne,
} from 'typeorm';
import { Field, ObjectType, Int } from 'type-graphql';

import { User, Conversation } from '.';

export enum ChannelOwnerType {
  TEAM = 'team',
  ORGANIZATION = 'organization',
  SHARED = 'shared',
}

@Entity('channels')
@ObjectType()
export class Channel {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @Field({ nullable: true })
  @Column()
  name?: string;

  @Field({ nullable: true })
  @Column({
    nullable: true,
  })
  about?: string;

  @Field()
  @Column({
    type: 'uuid',
    name: 'user_id',
  })
  userId?: string;

  @Field()
  @Column({
    type: 'boolean',
    name: 'is_private',
  })
  isPrivate?: boolean;

  @Field()
  @Column({
    type: 'uuid',
    name: 'owner_id',
  })
  ownerId?: string;

  @Column({
    type: 'enum',
    enum: ChannelOwnerType,
    default: ChannelOwnerType.ORGANIZATION,
    enumName: 'owner_type',
    name: 'owner_type',
  })
  @Field()
  ownerType: string

  @Column({
    nullable: true,
  })
  @Field({ nullable: true })
  avatar?: string;

  @Column({
    nullable: true,
    type: 'tsvector',
    select: false,
  })
  tsv?: string;

  @Column({
    name: 'last_updated_by_id',
    type: 'uuid',
  })
  @Field()
  lastUpdateById?: string;

  @Column({
    name: 'organization_id',
    type: 'uuid',
  })
  @Field()
  organizationId?: string;

  @CreateDateColumn({
    name: 'created_at',
    default: new Date(),
  })
  @Field()
  createdAt?: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    default: new Date(),
  })
  @Field()
  updatedAt?: Date;

  @Field(() => User)
  @OneToOne(() => User)
  @JoinColumn({
    name: 'user_id',
    referencedColumnName: 'id',
  })
  user?: User

  @Field(() => User)
  @OneToOne(() => User)
  @JoinColumn({
    name: 'last_updated_by_id',
    referencedColumnName: 'id',
  })
  lastUpdatedBy?: User;

  @Field(() => Conversation)
  @ManyToOne(() => Conversation)
  @JoinColumn({
    name: 'id',
    referencedColumnName: 'receiverId',
  })
  conversation?: Conversation;

  @Field(() => Int)
  @Column({
    select: false,
    insert: false,
    readonly: true,
  })
  members?: number;

  @ManyToMany(() => User)
  @JoinTable({
    name: 'channel_users',
    joinColumn: {
      name: 'channel_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'user_id',
      referencedColumnName: 'id',
    },
  })
  users?: User[];
}
