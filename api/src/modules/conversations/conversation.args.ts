import { ArgsType, Field } from 'type-graphql';
import { IsUUID } from 'class-validator';

@ArgsType()
export class ConversationIDArgs {
  @Field()
  @IsUUID()
  conversationId?: string
}
