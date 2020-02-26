import {
  Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable,
} from 'typeorm';
import { Field, ObjectType } from 'type-graphql';

import { Workspace } from '.';
import { Channel } from './channel';

@Entity('users')
@ObjectType()
export class User {
  @PrimaryGeneratedColumn('uuid')
  readonly id?: string;

  @Field()
  @Column({
    nullable: true,
  })
  name?: string;

  @Field()
  @Column()
  email?: string;

  @Column({
    nullable: true,
  })
  password?: string;

  @Field()
  @Column({
    name: 'is_verified',
    type: 'boolean',
  })
  isVerified?: boolean;

  @Column({
    nullable: true,
  })
  @Field()
  avatar?: string;

  @Field(() => Workspace)
  @ManyToMany(() => Workspace, (workspace) => workspace.users)
  @JoinTable({
    name: 'workspace_users',
    joinColumn: {
      name: 'user_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'workspace_id',
      referencedColumnName: 'id',
    },
  })
  workspaces?: Workspace[];

  @ManyToMany(() => Channel, (channel) => channel.users)
  @JoinTable({
    name: 'channel_users',
    joinColumn: {
      name: 'user_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'channel_id',
      referencedColumnName: 'id',
    },
  })
  channels?: Channel[];
}
