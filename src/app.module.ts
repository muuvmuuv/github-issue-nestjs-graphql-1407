import { Module } from '@nestjs/common'
import { APP_FILTER } from '@nestjs/core'
import { GraphQLModule } from '@nestjs/graphql'
import { RedisCache } from 'apollo-server-cache-redis'

import { AppController } from './app.controller'
import { CommonModule } from './common/common.module'
import { HttpExceptionFilter } from './common/http-exception.filter'
import { ConfigModule } from './config/config.module'
import { ConfigService } from './config/config.service'
import { DatabaseModule } from './database/database.module'
import { HealthModule } from './health/health.module'
import { PvtecModule } from './pvtec/pvtec.module'
import { UserModule } from './user/user.module'

@Module({
  imports: [
    ConfigModule,
    CommonModule,
    DatabaseModule,
    GraphQLModule.forRoot({
      debug: ConfigService.isDevelopment,
      playground: ConfigService.isDevelopment,
      autoSchemaFile: true,
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
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {}
