import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { plainToClass } from 'class-transformer'
import { ObjectId } from 'mongodb'
import { MongoRepository } from 'typeorm'

import { CONFIG_KEY_APP } from '../config/app.config'
import { UserArguments } from './dto/user.arguments'
import { UserInput } from './dto/user.input'
import { User } from './model/user.model'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User, CONFIG_KEY_APP)
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
    const user = plainToClass(User, input)

    user._id = new ObjectId().toHexString()

    return await this.user.save(user)
  }
}
