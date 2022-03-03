import { ApolloError } from 'apollo-server-core'
import bcrypt from 'bcrypt'
import {
 CreateUserInput,
 LoginInput,
 User,
 userIdInput,
 UserModel,
} from '../schemas/userSchema'
import Context from '../types/context'

import { signJwt } from '../utils/jwt'

class UserService {
 async createUser(input: CreateUserInput) {
  return UserModel.create(input)
 }
 async login(input: LoginInput) {
  const user = await UserModel.find().findByEmail(input?.email).lean()
  //   Check  the user
  if (!user) {
   throw new ApolloError('invalid email or password')
  }
  const passwordIsValid = await bcrypt.compare(input?.password, user?.password)
  if (!passwordIsValid) throw new ApolloError('wrong password')
  const token = signJwt(user)

  return token
 }
 async users() {
  return await UserModel.find().lean()
 }
 async user(input: userIdInput) {
  return await UserModel.findById(input).lean()
 }
 async update(input: CreateUserInput & { id: User['_id'] }) {
  return await UserModel.findByIdAndUpdate(input?.id, input)
 }
 async delete(input: userIdInput) {
  let del = await UserModel.findByIdAndDelete(input)
  if (!del) return 'unsuccessfuly deleted..!!'
  return 'successfull deleted'
 }
}

export default UserService
