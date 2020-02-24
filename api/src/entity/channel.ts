import {
  Entity, PrimaryGeneratedColumn, Column, OneToOne, CreateDateColumn,
} from 'typeorm';
import { Field, ObjectType } from 'type-graphql';

import User from './user';
import Workspace from './workspace';

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
  @OneToOne(() => User)
  @Column({
    type: 'uuid',
    name: 'user_id',
  })
  userId?: string;

  @Field()
  @OneToOne(() => Workspace)
  @Column({
    type: 'uuid',
    name: 'workspace_id',
  })
  workspaceId?: string;

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
