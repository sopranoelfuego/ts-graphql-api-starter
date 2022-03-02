import { Arg, Ctx, Mutation, Query, Resolver } from 'type-graphql'
import { CreateUserInput, LoginInput, User } from '../schemas/userSchema'
import UserService from '../services/userServices'
import Context from '../types/context'

@Resolver()
export default class userResolver {
 constructor(private userService: UserService) {
  this.userService = new UserService()
 }
 @Mutation(() => User)
 createUser(@Arg('input') input: CreateUserInput) {
  return this.userService.createUser(input)
 }
 @Mutation(() => String)
 login(@Arg('input') loginInput: LoginInput, @Ctx() context: Context) {
  console.log('login input', loginInput)
  return this.userService.login(loginInput, context)
 }

 @Query(() => User)
 me(@Ctx() context: Context) {
  return context.user
 }
 //  @Query(()=>[User)
}
