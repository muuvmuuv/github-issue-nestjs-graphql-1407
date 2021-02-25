import { Field, InputType } from '@nestjs/graphql'
import { MaxLength } from 'class-validator'

import { User } from '../model/user.model'

@InputType({
  description: 'New user data',
})
export class UserInput implements Partial<User> {
  @Field()
  @MaxLength(64)
  username: string

  @Field()
  password: string
}
