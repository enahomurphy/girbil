import { Field, InputType } from 'type-graphql';
import { IsUUID, IsUrl } from 'class-validator';

@InputType()
export class AddMessageInput {
  @Field()
  @IsUUID()
  id: string

  @Field()
  @IsUrl()
  video: string

  @Field()
  @IsUrl()
  thumbnail: string
}
