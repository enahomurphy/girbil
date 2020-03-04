import { Field, ObjectType } from 'type-graphql';
import { plainToClass } from 'class-transformer';

import { Organization } from '../../entity';

@ObjectType()
export class CreateOrganizationType {
  @Field(() => Organization, { nullable: true })
  organization: Organization

  @Field({ nullable: true })
  token: string

  static create(token: string, organization: Organization): AuthType {
    return plainToClass(CreateOrganizationType, { token, organization });
  }
}
