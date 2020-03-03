import {
  Entity, OneToOne, JoinColumn, PrimaryColumn,
} from 'typeorm';
import { Field, ObjectType } from 'type-graphql';

import { User } from './user';
import { Organization } from './organization';

@Entity('user_organizations')
@ObjectType()
export class UserOrganization {
  @Field()
  @PrimaryColumn({
    type: 'uuid',
    name: 'user_id',
  })
  userId?: string;

  @Field()
  @PrimaryColumn({
    name: 'organization_id',
    type: 'uuid',
  })
  organizationId?: string;

  @Field(() => Organization)
  @OneToOne(() => Organization, { eager: true })
  @JoinColumn({
    name: 'organization_id',
    referencedColumnName: 'id',
  })
  readonly organization?: User
}
