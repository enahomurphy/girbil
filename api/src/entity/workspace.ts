import {
  Entity, PrimaryGeneratedColumn, Column, OneToOne, ManyToMany, JoinColumn,
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
  @Column({
    nullable: true,
  })
  about?: string;

  @Field()
  @Column({
    name: 'user_id',
    type: 'uuid',
  })
  userId?: string;

  @Field()
  @OneToOne(() => User)
  @JoinColumn({
    name: 'user_id',
    referencedColumnName: 'id',
  })
  owner?: string;

  @Column({
    nullable: true,
  })
  @Field()
  avatar?: string;

  @ManyToMany(() => User, (user) => user.workspaces)
  users: User[];
}
