import {
  Entity, OneToOne, JoinColumn, PrimaryColumn, Column,
} from 'typeorm';
import { Field, ObjectType } from 'type-graphql';

import { User } from './user';
import { Organization } from './organization';

export enum RoleType {
  USER = 'user',
  OWNER = 'owner',
  ADMIN = 'admin',
  RESEARCHER = 'researcher',
}

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

  @Field()
  @Column({
    type: 'enum',
    enum: RoleType,
    default: RoleType.USER,
    enumName: 'role_type',
  })
  role?: RoleType;

  @Field(() => Organization)
  @OneToOne(() => Organization)
  @JoinColumn({
    name: 'organization_id',
    referencedColumnName: 'id',
  })
  readonly organization?: User
}
