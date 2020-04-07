import { ArgsType, Field } from 'type-graphql';
import { IsString, IsUUID } from 'class-validator';

@ArgsType()
export class ChannelArgs {
  @Field({ nullable: true })
  @IsString()
  text?: string


  @Field({ nullable: true })
  @IsString()
  name?: string
}

@ArgsType()
export class ChannelIDArgs {
  @Field()
  @IsUUID()
  channelId?: string
}
