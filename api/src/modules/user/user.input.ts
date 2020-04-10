import { Field, InputType } from 'type-graphql';
import { IsEmail, MinLength, IsString } from 'class-validator';

@InputType()
export class UserInput {
  @Field()
  @IsEmail()
  email: string

  @Field({ nullable: false })
  @MinLength(7, {
    message: 'password mus be at least 7 characters',
  })
  password: string

  @Field()
  name?: string
}

@InputType()
export class UserUpdateInput {
  @Field({ nullable: true })
  @IsString()
  name?: string

  @Field({ nullable: true })
  position?: string

  @Field({ nullable: true })
  avatar?: string
}

@InputType()
export class UserSettingInput {
  @Field({ nullable: true })
  hideInviteWidget?: boolean
}
