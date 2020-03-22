import { ArgsType, Field } from 'type-graphql';
import { IsUUID } from 'class-validator';

@ArgsType()
export class OrganizationIDArgs {
  @Field()
  @IsUUID()
  organizationId?: string
}
