import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { RedisCache } from 'apollo-server-cache-redis'

import { AppController } from './app.controller'
import { CommonModule } from './common/common.module'
import { ConfigModule } from './config/config.module'
import { ConfigService } from './config/config.service'
import { DatabasePvtecModule } from './db/pvtec.module'
import { HealthModule } from './health/health.module'
import { PvtecModule } from './pvtec/pvtec.module'
import { UserModule } from './user/user.module'

@Module({
  imports: [
    ConfigModule,
    CommonModule,
    DatabasePvtecModule,
    GraphQLModule.forRoot({
      debug: ConfigService.isDevelopment,
      playground: ConfigService.isDevelopment,
      autoSchemaFile: 'schema.graphql',
      persistedQueries: ConfigService.isProduction && {
        ttl: 1000,
        cache: new RedisCache({
          host: '127.0.0.1',
          port: 45503,
        }),
      },
    }),
    HealthModule,
    UserModule,
    PvtecModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
