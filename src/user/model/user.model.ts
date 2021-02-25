import { Field, ObjectType } from '@nestjs/graphql'
import { Exclude } from 'class-transformer'
import {
  Column,
  CreateDateColumn,
  Entity,
  ObjectIdColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm'

@Entity()
@Unique(['username'])
@ObjectType({
  description: 'A user to authenticate with',
})
export class User {
  @Field()
  @ObjectIdColumn()
  _id: string

  @Field()
  @Column()
  username: string

  @Exclude()
  @Field()
  @Column({ select: false })
  password: string

  @Field(() => Date)
  @CreateDateColumn()
  created_at: Date

  @Field(() => Date)
  @UpdateDateColumn()
  updated_at: Date
}
