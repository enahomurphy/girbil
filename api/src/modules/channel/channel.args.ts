import { ArgsType, Field } from 'type-graphql';
import { IsString } from 'class-validator';

@ArgsType()
export class ChannelArgs {
  @Field()
  @IsString()
  text?: string
}
