
import { Field, ArgsType } from 'type-graphql';
import { IsUUID } from 'class-validator';

@ArgsType()
export class UploadURLArgs {
  @Field()
  @IsUUID()
  id: string

  @Field()
  @IsUUID()
  conversationId: string
}
