import { ObjectType, Field } from 'type-graphql';
import {
  Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToMany,
} from 'typeorm';

@Entity('organizations')
@ObjectType()
export class Organization {
  @PrimaryGeneratedColumn('uuid')
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
  @Column()
  user_id: string

  @Field({ nullable: true })
  @CreateDateColumn({
    name: 'created_at',
  })
  createdAt: string

  @ManyToMany('User', 'organizations')
  users: User[];
}
