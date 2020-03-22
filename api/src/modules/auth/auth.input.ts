import { Field, InputType } from 'type-graphql';
import { IsEmail } from 'class-validator';

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

  @Field({ nullable: true })
  inviteId?: string

  @Field({ nullable: true })
  emailToken?: string

  @Field()
  type: string
}

@InputType()
export class InviteInput {
  @IsEmail({}, { each: true })
  @Field(() => [String])
  emails: string[]
}

@InputType()
export class InviteArgs {
  @Field({ nullable: true })
  inviteId: string

  @Field({ nullable: true })
  emailToken: string
}
