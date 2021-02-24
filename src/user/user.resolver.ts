import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { ConflictException, NotFoundException } from '@nestjs/common'
import { ObjectId, WriteError } from 'mongodb'

import { ObjectIdException } from '../common/object-id.exception'
import { UserService } from './user.service'
import { User } from './user.entity'
import { UserInput } from './user.input'

@Resolver('User')
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => User)
  async user(@Args('id') id: ObjectId): Promise<User> {
    if (!ObjectId.isValid(id)) {
      throw new ObjectIdException()
    }
    const user = await this.userService.find(id)
    if (!user) {
      throw new NotFoundException()
    }
    return user
  }

  @Query(() => [User])
  async users(): Promise<User[]> {
    return await this.userService.findAll()
  }

  @Mutation(() => User)
  async createUser(@Args('input') input: UserInput): Promise<User> {
    try {
      return await this.userService.create(input)
    } catch (error_) {
      const error = error_ as WriteError

      if (error.code === 11000) {
        throw new ConflictException('Username or email already taken')
      }
    }
  }
}
