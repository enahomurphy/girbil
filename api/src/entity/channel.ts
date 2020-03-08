import {
  Entity, PrimaryGeneratedColumn, Column, CreateDateColumn,
  OneToOne, UpdateDateColumn, ManyToMany, JoinTable,
} from 'typeorm';
import { Field, ObjectType } from 'type-graphql';

import { User } from '.';

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

  @Field()
  @Column({
    type: 'uuid',
    name: 'owner_id',
  })
  ownerId?: string;

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

  @Column({
    name: 'organization_id',
    type: 'uuid',
  })
  @Field()
  organizationId?: string;


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

  @OneToOne(() => User)
  @Field(() => User)
  user?: User

  @Field(() => User)
  @OneToOne(() => User)
  lastUpdatedBy?: User;

  @Field(() => User)
  @ManyToMany(() => User, (user) => user.channels)
  @JoinTable({
    name: 'channel_users',
    joinColumn: {
      name: 'channel_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'user_id',
      referencedColumnName: 'id',
    },
  })
  users?: User[];
}
