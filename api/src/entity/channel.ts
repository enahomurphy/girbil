import {
  Entity, PrimaryGeneratedColumn, Column, CreateDateColumn,
  ManyToMany, JoinColumn, OneToOne, UpdateDateColumn,
} from 'typeorm';
import { Field, ObjectType } from 'type-graphql';

import { User } from '.';
import { Team } from './team';

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
  @Field(() => User)
  user?: User

  @Field()
  @Column({
    type: 'uuid',
    name: 'team_id',
  })
  teamId?: string;

  @Field(() => Team)
  @OneToOne(() => Team)
  @JoinColumn({
    name: 'team_id',
    referencedColumnName: 'id',
  })
  team?: Team;

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
}
