/* eslint-disable max-classes-per-file */
import { Field, ArgsType, InputType } from 'type-graphql';
import { IsUUID, IsString } from 'class-validator';

@ArgsType()
export class GetOrganizationInput {
  @Field()
  @IsUUID()
  userId: string
}


@InputType()
export class AddOrgInput {
  @Field()
  @IsString()
  domain: string

  @Field()
  @IsString()
  name: string
}
