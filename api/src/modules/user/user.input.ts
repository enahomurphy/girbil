import { Field, InputType } from 'type-graphql';
import { IsEmail, MinLength } from 'class-validator';

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