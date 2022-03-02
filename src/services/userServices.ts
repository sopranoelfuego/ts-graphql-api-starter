import { ApolloError } from 'apollo-server-core'
import bcrypt from 'bcrypt'
import { CreateUserInput, LoginInput, UserModel } from '../schemas/userSchema'
import Context from '../types/context'
import { signJwt } from '../utils/jwt'

class UserService {
 async createUser(input: CreateUserInput) {
  return UserModel.create(input)
 }
 async login(input: LoginInput, context: Context) {
  const user = await UserModel.find().findByEmail(input?.email).lean()
  //   Check  the user
  if (!user) {
   throw new ApolloError('invalid email or password')
  }
  const passwordIsValid = await bcrypt.compare(input?.password, user?.password)
  if (!passwordIsValid) throw new ApolloError('wrong password')
  const token = signJwt(user)

  // set a cookie for the jwt
  //   context.res.cookie('accessToken', token, {
  //    maxAge: 3.154e10, // 1 year
  //    httpOnly: true,
  //    domain: 'localhost',
  //    path: '/',
  //    sameSite: 'strict',
  //    secure: process.env.NODE_ENV === 'production',
  //   })
  return token
 }
}
export default UserService
