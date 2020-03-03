/* eslint-disable max-classes-per-file */
import { Field, ArgsType } from 'type-graphql';
import { IsUUID } from 'class-validator';

@ArgsType()
export class GetOrganizationInput {
  @Field()
  @IsUUID()
  userId: string
}
