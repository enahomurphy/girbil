import { Field, InputType } from 'type-graphql';

@InputType()
export class UploadInput {
  @Field()
  type: string

  @Field()
  name: string
}
