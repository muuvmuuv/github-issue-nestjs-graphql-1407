import {
  Column,
  CreateDateColumn,
  Entity,
  ObjectIdColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm'
import dayjs from 'dayjs'
import { Transform } from 'class-transformer'
import { ObjectId } from 'mongodb'

@Entity()
@Unique(['username'])
export class User {
  @ObjectIdColumn()
  _id: ObjectId

  @Column()
  username: string

  @Column({ select: false })
  password: string

  @CreateDateColumn()
  @Transform(() => dayjs)
  created_at: dayjs.Dayjs
  @UpdateDateColumn()
  updated_at: string

  constructor(entity?: Partial<User>) {
    Object.assign(this, entity)
  }
}
