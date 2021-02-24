import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { RedisCache } from 'apollo-server-cache-redis'

import { CommonModule } from './common/common.module'
import { AppController } from './app.controller'
import { PvtecModule } from './pvtec/pvtec.module'
import { UserModule } from './user/user.module'
import { HealthModule } from './health/health.module'
import { ConfigModule } from './config/config.module'
import { DatabasePvtecModule } from './db/pvtec.module'
import { ConfigService } from './config/config.service'

@Module({
  imports: [
    ConfigModule,
    DatabasePvtecModule,
    GraphQLModule.forRoot({
      debug: ConfigService.isDevelopment,
      playground: ConfigService.isDevelopment,
      typePaths: ['./**/*.graphql'],
      persistedQueries: ConfigService.isProduction && {
        ttl: 1000,
        cache: new RedisCache({
          host: '127.0.0.1',
          port: 45503,
        }),
      },
    }),
    CommonModule,
    HealthModule,
    UserModule,
    PvtecModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
