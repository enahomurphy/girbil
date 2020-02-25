import {
  Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToMany,
} from 'typeorm';
import { Field, ObjectType } from 'type-graphql';

import { User } from '.';

export enum ChannelType {
  USER = 'user',
  TEAM = 'workspace',
}

@Entity('channels')
@ObjectType()
export class Channel {
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @Field()
  @Column()
  name?: string;

  @Field()
  @Column()
  about?: string;

  @Field()
  @Column({
    type: 'enum',
    enum: ChannelType,
    default: ChannelType.USER,
    enumName: 'channel_type',
  })
  type: ChannelType;

  @Field()
  @Column({
    type: 'uuid',
    name: 'owner_id',
  })
  ownerId?: string;

  @Field()
  @Column({
    type: 'uuid',
    name: 'user_id',
  })
  userId?: string;

  @Column({
    name: 'last_updated_by',
    type: 'uuid',
  })
  @Field()
  lastUpdateBy?: string;

  @Column()
  @Field()
  avatar?: string;

  @CreateDateColumn({
    name: 'updated_at',
  })
  @Field()
  updatedAt?: Date;

  @ManyToMany(() => User, (user) => user.channels)
  users?: User[];
}
