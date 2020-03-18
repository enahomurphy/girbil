import {
  Entity, PrimaryGeneratedColumn, OneToOne, CreateDateColumn, PrimaryColumn,
} from 'typeorm';
import { Field, ObjectType } from 'type-graphql';

import { Organization } from './organization';

@Entity('shares')
@ObjectType()
export class Share {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Field()
  @PrimaryColumn({
    name: 'organization_id',
    type: 'uuid',
  })
  @OneToOne(() => Organization)
  organizationId?: string;

  @Field()
  @CreateDateColumn({
    name: 'created_at',
    default: new Date(),
  })
  createdAt?: Date;
}
