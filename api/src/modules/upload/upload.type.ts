/* eslint-disable max-classes-per-file */
import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export class UploadType {
  @Field()
  postThumbnailURL: string

  @Field()
  getThumbnailURL: string

  @Field()
  postVideoURL: string

  @Field()
  getVideoURL: string
}
