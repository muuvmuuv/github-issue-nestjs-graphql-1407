import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { ObjectId } from 'mongodb'
import { MongoRepository } from 'typeorm'

import { CONFIG_KEY_PVTEC } from '../config/pvtec.config'
import { User } from './user.entity'
import { UserInput } from './user.input'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User, CONFIG_KEY_PVTEC)
    private readonly user: MongoRepository<User>
  ) {}

  async find(id: ObjectId): Promise<User> {
    return this.user.findOne({
      _id: id,
    })
  }

  async findAll(): Promise<User[]> {
    return this.user.find()
  }

  async create(input: UserInput): Promise<User> {
    const user = new User(input)

    user._id = new ObjectId()

    return this.user.save(user)
  }
}
