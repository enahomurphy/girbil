import {
  Entity, PrimaryGeneratedColumn, Column, OneToOne, CreateDateColumn,
} from 'typeorm';
import { Field, ObjectType } from 'type-graphql';

import User from './user';
import Workspace from './workspace';

export enum ChannelType {
  USER = 'user',
  TEAM = 'team',
}

@Entity('channels')
@ObjectType()
export default class Channel {
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
  @OneToOne(() => Workspace)
  @Column({
    type: 'uuid',
    name: 'owner_id',
  })
  ownerId?: string;

  @CreateDateColumn({
    name: 'last_updated_by',
  })
  @OneToOne(() => User)
  @Field()
  lastUpdateBy?: Date;

  @Column()
  @Field()
  avatar?: string;
}
