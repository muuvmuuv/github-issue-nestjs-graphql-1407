import { Injectable } from '@nestjs/common'

import { NewUserInput } from './dto/new-user.input'
import { User } from './model/user.model'

@Injectable()
export class UserService {
  async create(data: NewUserInput): Promise<User> {
    console.log(data)
    return {} as User
  }

  async findOneById(id: string): Promise<User> {
    console.log(id)
    return {} as User
  }

  async remove(id: string): Promise<boolean> {
    console.log(id)
    return true
  }
}
