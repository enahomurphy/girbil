import { ArgsType, Field, Int } from 'type-graphql';
import { Max, Min, IsUUID } from 'class-validator';

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
}
