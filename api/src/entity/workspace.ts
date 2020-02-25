import {
  Entity, PrimaryGeneratedColumn, Column, OneToOne, ManyToMany,
} from 'typeorm';
import { Field, ObjectType } from 'type-graphql';

import { User } from '.';

@Entity('workspaces')
@ObjectType()
export class Workspace {
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

  @ManyToMany(() => User, (user) => user.workspaces)
  users: User[];
}
