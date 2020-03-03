import { Field, InputType } from 'type-graphql';

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
