import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { ConfigModule } from '../config/config.module'
import { ConfigService } from '../config/config.service'
import { CONFIG_KEY_PVTEC } from '../config/pvtec.config'

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      name: CONFIG_KEY_PVTEC,
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'mongodb',
        url: config.get('pvtec.mongoDsn'),
        database: config.get('pvtec.database'),
        authSource: 'admin',
        entities: ['dist/**/*.model{.ts,.js}'],
        useNewUrlParser: true,
        keepConnectionAlive: ConfigService.isDevelopment,
        synchronize: ConfigService.isDevelopment,
        logging: ConfigService.isDevelopment,
      }),
    }),
  ],
})
export class DatabasePvtecModule {}
