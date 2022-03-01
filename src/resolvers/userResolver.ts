import { Arg, Mutation, Query, Resolver } from 'type-graphql'
import { CreateUserInput, User } from '../schemas/userSchema'
import UserService from '../services/userServices'

@Resolver()
export default class userResolver {
 constructor(private userService: UserService) {
  this.userService = new UserService()
 }
 @Mutation(() => User)
 createUser(@Arg('input') input: CreateUserInput) {
  return this.userService.createUser(input)
 }
 @Query(() => User)
 me() {
  return {
   _id: '1234',
   name: 'babalao',
   aka: 'doctor love',
   email: 'fundi@gmail.com',
  }
 }
}
