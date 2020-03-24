import { ArgsType, Field } from 'type-graphql';
import { IsString, IsUUID } from 'class-validator';

@ArgsType()
export class OrganizationIDArgs {
  @Field()
  @IsUUID()
  organizationId?: string
}

@ArgsType()
export class OrgSearchArgs {
  @Field()
  @IsString()
  text: string
}