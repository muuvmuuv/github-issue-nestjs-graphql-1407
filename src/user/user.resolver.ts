import { ConflictException, NotFoundException } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { ObjectId, WriteError } from 'mongodb'

import { ObjectIdException } from '../common/object-id.exception'
import { UserArguments } from './dto/user.arguments'
import { UserInput } from './dto/user.input'
import { User } from './model/user.model'
import { UserService } from './user.service'

@Resolver('User')
export class UserResolver {
  constructor(private userService: UserService) {}

  @Query(() => User)
  async user(@Args('id') id: string): Promise<User> {
    if (!ObjectId.isValid(id)) {
      throw new ObjectIdException()
    }
    const user = await this.userService.findOne(id)
    if (!user) {
      throw new NotFoundException()
    }
    return user
  }

  @Query(() => [User])
  async users(@Args() options: UserArguments): Promise<User[]> {
    return await this.userService.findAll(options)
  }

  @Mutation(() => User)
  async createUser(@Args('data') data: UserInput): Promise<User> {
    try {
      return await this.userService.create(data)
    } catch (error_) {
      const error = error_ as WriteError

      if (error.code === 11000) {
        throw new ConflictException('Username or email already taken')
      }
    }
  }
}
