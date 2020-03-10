import {
  Entity, PrimaryGeneratedColumn, Column, OneToOne, CreateDateColumn,
} from 'typeorm';
import { Field, ObjectType } from 'type-graphql';

import { Organization } from './organization';

@Entity('invites')
@ObjectType()
export class Invite {
  @PrimaryGeneratedColumn('uuid')
  readonly id?: string;

  @Field()
  @Column()
  email?: string;

  @Field()
  @CreateDateColumn({
    name: 'created_at',
    default: new Date(),
  })
  createdAt?: Date;

  @Field()
  @Column({
    name: 'organization_id',
    type: 'uuid',
  })
  @OneToOne(() => Organization)
  organizationId?: string;
}
