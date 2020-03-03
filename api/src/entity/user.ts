import {
  Entity, PrimaryGeneratedColumn, Column, ManyToMany,
} from 'typeorm';
import { Field, ObjectType } from 'type-graphql';

import { Organization } from './organization';

@Entity('users')
@ObjectType()
export class User {
  @PrimaryGeneratedColumn('uuid')
  @Field()
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

  @Field({ nullable: true })
  @Column({
    name: 'is_verified',
    type: 'boolean',
  })
  isVerified?: boolean;

  @Column({
    nullable: true,
  })
  @Field({ nullable: true })
  avatar?: string;

  @ManyToMany(() => Organization, (organization) => organization.users)
  organizations: Organization[];
}
