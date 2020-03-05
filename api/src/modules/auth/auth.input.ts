import { Field, InputType } from 'type-graphql';
import {
  IsEmail, ValidateNested, IsArray, IsUUID,
} from 'class-validator';

@InputType()
export class LoginInput {
  @Field()
  email: string

  @Field()
  password: string
}

@InputType()
export class SocialInput {
  @Field()
  accessToken: string

  @Field()
  type: string
}

@InputType()
export class InviteInput {
  @IsEmail({}, { each: true })
  @Field(() => [String])
  emails: string[]
}
