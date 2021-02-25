import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { CONFIG_KEY_APP } from '../config/app.config'
import { User } from './model/user.model'
import { UserResolver } from './user.resolver'
import { UserService } from './user.service'

@Module({
  imports: [TypeOrmModule.forFeature([User], CONFIG_KEY_APP)],
  providers: [UserResolver, UserService],
})
export class UserModule {}
