import { Field, InputType } from 'type-graphql';
import { IsUUID, IsUrl, ValidateIf } from 'class-validator';

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

  @IsUUID()
  @ValidateIf((e) => e.parentId)
  @Field(() => String, { nullable: true })
  parentId?: string
}
