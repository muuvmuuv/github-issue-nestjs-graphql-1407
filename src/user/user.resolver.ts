import { NotFoundException } from '@nestjs/common'
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql'
import { PubSub } from 'apollo-server-fastify'

import { NewUserInput } from './dto/new-user.input'
import { User } from './model/user.model'
import { UserService } from './user.service'

const pubSub = new PubSub()

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => User)
  async user(@Args('id') id: string): Promise<User> {
    const recipe = await this.userService.findOneById(id)
    if (!recipe) {
      throw new NotFoundException(id)
    }
    return recipe
  }

  @Mutation(() => User)
  async addUser(@Args('newUserData') newUserData: NewUserInput): Promise<User> {
    const user = await this.userService.create(newUserData)
    pubSub.publish('userAdded', { userAdded: user })
    return user
  }

  @Mutation(() => Boolean)
  async removeRecipe(@Args('id') id: string): Promise<boolean> {
    return this.userService.remove(id)
  }

  @Subscription(() => User)
  recipeAdded(): AsyncIterator<User> {
    return pubSub.asyncIterator('userAdded')
  }
}
