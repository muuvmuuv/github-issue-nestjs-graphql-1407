import { Field, ObjectType } from '@nestjs/graphql'
import { Transform } from 'class-transformer'
import dayjs from 'dayjs'
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
  @Field(() => String)
  @ObjectIdColumn()
  _id: string

  @Field()
  @Column()
  username: string

  @Field()
  @Column({ select: false })
  password: string

  @Field(() => Date)
  @CreateDateColumn()
  @Transform(() => dayjs)
  created_at: dayjs.Dayjs

  @Field(() => Date)
  @UpdateDateColumn()
  @Transform(() => dayjs)
  updated_at: dayjs.Dayjs

  constructor(entity?: Partial<User>) {
    Object.assign(this, entity)
  }
}
