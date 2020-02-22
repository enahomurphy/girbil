import {
  Entity, PrimaryGeneratedColumn, Column, OneToOne, CreateDateColumn,
} from 'typeorm';
import { Field, ObjectType } from 'type-graphql';

import User from './user';
import Workspace from './workspace';

@Entity()
@ObjectType()
export default class Group {
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
  @Column('uuid')
  userId?: string;

  @Field()
  @OneToOne(() => Workspace)
  @Column('uuid')
  workspaceId?: string;

  @CreateDateColumn()
  @OneToOne(() => User)
  @Field()
  lastUpdateBy?: Date;

  @Column()
  @Field()
  avatar?: string;
}
