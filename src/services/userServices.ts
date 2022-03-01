import { UserModel } from '../schemas/userSchema'

class UserService {
 async createUser(input: any) {
  console.log('this is input', input)
  return UserModel.create(input)
 }
}
export default UserService
