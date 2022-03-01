import { getModelForClass, prop } from '@typegoose/typegoose'
import { IsEmail, MaxLength, MinLength } from 'class-validator'
import { Field, InputType, ObjectType } from 'type-graphql'

@ObjectType()
export class User {
 @Field(() => String)
 _id: string
 @Field(() => String)
 @prop({ required: true })
 name: string
 @Field(() => String)
 aka: string
 @Field(() => String)
 email: string
 @prop({ required: true })
 password: string
}
export const UserModel = getModelForClass(User)

@InputType()
export class CreateUserInput {
 @Field(() => String)
 name: string
 @Field(() => String)
 aka: string
 @MinLength(6, {
  message: 'the password must be at least minimum 6 characters long ',
 })
 @MaxLength(40, {
  message: 'the password must not exceed 40 characters',
 })
 @Field(() => String)
 password: string
 @IsEmail()
 @Field(() => String)
 email: string
}
