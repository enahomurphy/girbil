import {
  Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn,
  CreateDateColumn, ManyToMany, JoinTable,
} from 'typeorm';
import { Field, ObjectType } from 'type-graphql';

import { User } from '.';

@Entity('teams')
@ObjectType()
export class Team {
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
  @Column({
    name: 'organization_id',
    type: 'uuid',
  })
  organizationId?: string;

  @Field()
  @CreateDateColumn({
    name: 'created_at',
  })
  createdAt: string

  @Column({
    nullable: true,
  })
  @Field()
  avatar?: string;

  @Field()
  @OneToOne(() => User)
  @JoinColumn({
    name: 'user_id',
    referencedColumnName: 'id',
  })
  user?: string;

  @ManyToMany(() => User)
  @JoinTable({
    name: 'user_teams',
    joinColumn: {
      name: 'team_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'user_id',
      referencedColumnName: 'id',
    },
  })
  users?: User[];
}
