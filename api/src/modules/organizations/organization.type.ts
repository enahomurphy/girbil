import { Field, ObjectType } from 'type-graphql';
import { plainToClass } from 'class-transformer';

import { Organization } from '../../entity';

@ObjectType()
export class CreateOrganizationType {
  @Field(() => Organization, { nullable: true })
  organization: Organization

  @Field(() => String, { nullable: true })
  token?: string

  static create(organization: Organization, token?: string): CreateOrganizationType {
    return plainToClass(CreateOrganizationType, { token, organization });
  }
}
