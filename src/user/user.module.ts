import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { CONFIG_KEY_PVTEC } from '../config/pvtec.config'
import { User } from './model/user.model'
import { UserResolver } from './user.resolver'
import { UserService } from './user.service'

@Module({
  imports: [TypeOrmModule.forFeature([User], CONFIG_KEY_PVTEC)],
  providers: [UserResolver, UserService],
})
export class UserModule {}
