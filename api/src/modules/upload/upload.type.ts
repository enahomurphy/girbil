/* eslint-disable max-classes-per-file */
import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export class UploadType {
  @Field()
  getURL: string;

  @Field()
  postURL: string;
}
