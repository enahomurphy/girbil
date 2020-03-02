import { ObjectType, Field } from 'type-graphql';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('organizations')
@ObjectType()
export class Organization {
  @PrimaryGeneratedColumn('uuid')
  readonly id: string

  @Field()
  @Column()
  name: string

  @Field()
  @Column({
    unique: true,
  })
  domain: string

  @Field()
  @Column()
  user_id: string

  @Field()
  @CreateDateColumn({
    name: 'created_at'
  })
  createdAt: string
}