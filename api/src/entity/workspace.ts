import {
  Entity, PrimaryGeneratedColumn, Column, OneToOne,
} from 'typeorm';
import { Field, ObjectType } from 'type-graphql';

import User from './user';

@Entity('workspaces')
@ObjectType()
export default class Workspace {
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
    name: 'user_id',
    type: 'uuid',
  })
  userId?: string;

  @Column()
  @Field()
  avatar?: string;
}
