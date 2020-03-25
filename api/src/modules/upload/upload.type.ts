/* eslint-disable max-classes-per-file */
import { Field, ObjectType } from 'type-graphql';
import { UploadURL, UploadVideo } from '../../interfaces';

@ObjectType()
export class UploadURLType implements UploadURL {
  @Field()
  postURL: string

  @Field()
  getURL: string
}

@ObjectType()
export class UploadType implements UploadVideo {
  @Field()
  postThumbnailURL: string

  @Field()
  getThumbnailURL: string

  @Field()
  postVideoURL: string

  @Field()
  getVideoURL: string
}
