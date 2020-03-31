import { ArgsType, Field, Int } from 'type-graphql';
import {
  Max, Min, IsUUID, ValidateIf,
} from 'class-validator';

@ArgsType()
export class MessagesArgs {
  @Field(() => Int, { nullable: true })
  @Min(0)
  skip? = 0;

  @Field(() => Int)
  @Min(1)
  @Max(50)
  take? = 10;

  @IsUUID()
  @Field()
  conversationId: string

  @IsUUID()
  @ValidateIf((e) => e.messageId)
  @Field(() => String, { nullable: true })
  messageId?: string
}


@ArgsType()
export class MessageIDArgs {
  @Field()
  @IsUUID()
  messageId?: string
}

@ArgsType()
export class MessageDeleteArgs extends MessageIDArgs {
  @Field()
  @IsUUID()
  conversationId?: string
}

@ArgsType()
export class MessageReactionArgs {
  @Field()
  @IsUUID()
  messageId: string

  @Field()
  reaction: string
}
