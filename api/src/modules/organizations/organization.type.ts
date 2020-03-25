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

@ObjectType()
export class SearchType {
  @Field()
  id: string

  @Field()
  name: string

  @Field()
  avatar: string

  @Field()
  type: string

  @Field({ nullable: true })
  conversation_id: string

  @Field({ nullable: true })
  members: number

  @Field({ nullable: true })
  is_private: boolean

  @Field({ nullable: true })
  is_member: boolean
}