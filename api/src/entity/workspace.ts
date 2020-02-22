import {
  Entity, PrimaryGeneratedColumn, Column, OneToOne,
} from 'typeorm';
import { Field, ObjectType } from 'type-graphql';

import User from './user';

@Entity()
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
  @Column()
  userId?: string;

  @Column()
  @Field()
  avatar?: string;
}
