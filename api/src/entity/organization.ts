import { ObjectType, Field } from 'type-graphql';
import {
  Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToMany, OneToOne, JoinTable,
} from 'typeorm';

import { User } from '.';

@Entity('organizations')
@ObjectType()
export class Organization {
  @PrimaryGeneratedColumn('uuid')
  @Field()
  readonly id: string

  @Field({ nullable: true })
  @Column()
  name: string

  @Field({ nullable: true })
  @Column({
    unique: true,
  })
  domain: string

  @Field({ nullable: true })
  @Column({
    name: 'user_id',
  })
  userId: string

  @Field({ nullable: true })
  @CreateDateColumn({
    name: 'created_at',
  })
  createdAt: Date

  @Field(() => User, { nullable: true })
  @OneToOne(() => User)
  creator: User

  @ManyToMany(() => User, (user) => user.organizations, {
    cascade: true,
  })
  @JoinTable({
    name: 'user_organizations',
    joinColumn: {
      name: 'user_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'organization_id',
      referencedColumnName: 'id',
    },
  })
  users: User[];
}
