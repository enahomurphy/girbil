import { Field, InputType } from 'type-graphql';
import { IsString, IsUrl, IsBoolean } from 'class-validator';

@InputType()
export class ChannelInput {
  @Field()
  @IsString()
  name?: string

  @Field({ nullable: true })
  @IsString()
  about?: string

  @Field(() => Boolean, { nullable: true })
  @IsBoolean()
  isPrivate = false

  @Field({ nullable: true })
  @IsUrl()
  avatar?: string;
}

@InputType()
export class ChannelUpdateInput extends ChannelInput {
  @Field({ nullable: true })
  @IsString()
  name?: string
}
