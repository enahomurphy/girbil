import {
  Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable,
} from 'typeorm';
import { Field, ObjectType } from 'type-graphql';

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
}
