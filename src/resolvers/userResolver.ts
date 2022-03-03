import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from 'type-graphql'
import {
 CreateUserInput,
 LoginInput,
 User,
 userIdInput,
} from '../schemas/userSchema'
import UserService from '../services/userServices'
import Context from '../types/context'

@Resolver()
export default class userResolver {
 constructor(private userService: UserService) {
  this.userService = new UserService()
 }
 // ====================MUTATIONS==========================

 @Mutation(() => User)
 createUser(@Arg('input') input: CreateUserInput) {
  return this.userService.createUser(input)
 }

 @Mutation(() => String)
 login(@Arg('input') loginInput: LoginInput) {
  console.log('login input', loginInput)
  return this.userService.login(loginInput)
 }

 @Authorized()
 @Mutation(() => User)
 updateUser(@Arg('input') input: CreateUserInput, @Ctx() context: Context) {
  const user = context?.user!
  return this.userService.update({ ...input, id: user?._id })
 }
 @Authorized()
 @Mutation(() => String)
 deleteUser(@Arg('input') input: userIdInput) {
  return this.userService.delete(input)
 }
 // ====================QUERIES==========================
 @Authorized()
 @Query(() => User, { nullable: true })
 me(@Ctx() context: Context) {
  return context.user
 }

 @Authorized()
 @Query(() => [User])
 users() {
  return this.userService.users()
 }
 @Authorized()
 @Query(() => User)
 user(@Arg('input') input: userIdInput) {
  return this.userService.user(input)
 }
}
