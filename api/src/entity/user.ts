import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { Field, ObjectType } from 'type-graphql';

@Entity('users')
@ObjectType()
export default class User {
  @PrimaryGeneratedColumn('uuid')
  readonly id?: string;

  @Field()
  @Column()
  name?: string;

  @Field()
  @Column()
  email?: string;

  @Column()
  password?: string;

  @Field()
  @Column({
    name: 'is_verified',
    type: 'boolean',
  })
  isVerified?: boolean;

  @Column()
  @Field()
  avatar?: string;
}
