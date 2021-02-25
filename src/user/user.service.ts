import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { ObjectId } from 'mongodb'
import { MongoRepository } from 'typeorm'

import { CONFIG_KEY_PVTEC } from '../config/pvtec.config'
import { UserArguments } from './dto/user.arguments'
import { UserInput } from './dto/user.input'
import { User } from './model/user.model'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User, CONFIG_KEY_PVTEC)
    private readonly user: MongoRepository<User>
  ) {}

  async findOne(id: string): Promise<User> {
    return await this.user.findOne({
      _id: id,
    })
  }

  async findAll(options: UserArguments): Promise<User[]> {
    return await this.user.find(options)
  }

  async create(input: UserInput): Promise<User> {
    const user = new User(input)

    user._id = new ObjectId().toHexString()

    return await this.user.save(user)
  }
}
