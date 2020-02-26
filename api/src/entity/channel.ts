import {
  Entity, PrimaryGeneratedColumn, Column, CreateDateColumn,
  ManyToMany, JoinColumn, OneToOne, UpdateDateColumn,
} from 'typeorm';
import { Field, ObjectType } from 'type-graphql';

import { User } from '.';
import { Workspace } from './workspace';

@Entity('channels')
@ObjectType()
export class Channel {
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @Field()
  @Column()
  name?: string;

  @Field()
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

  @OneToOne(() => User)
  @JoinColumn({
    name: 'user_id',
    referencedColumnName: 'id',
  })
  @Field(() => User)
  user?: User

  @Field()
  @Column({
    type: 'uuid',
    name: 'workspace_id',
  })
  workspaceId?: string;

  @Field(() => Workspace)
  @OneToOne(() => Workspace)
  @JoinColumn({
    name: 'workspace_id',
    referencedColumnName: 'id',
  })
  workspace?: Workspace;

  @Column({
    nullable: true,
  })
  @Field()
  avatar?: string;

  @Column({
    name: 'last_updated_by_id',
    type: 'uuid',
  })
  @Field()
  lastUpdateById?: string;

  @Field(() => User)
  @OneToOne(() => User)
  @JoinColumn({
    name: 'user_id',
    referencedColumnName: 'id',
  })
  lastUpdatedBy?: User;

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

  @ManyToMany(() => User, (user) => user.channels)
  users?: User[];
}
