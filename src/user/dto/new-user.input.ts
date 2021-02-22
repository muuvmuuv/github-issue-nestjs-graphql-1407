import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class NewUserInput {
  @Field()
  name: string
}
