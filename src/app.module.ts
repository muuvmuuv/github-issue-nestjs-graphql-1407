import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { TypeOrmModule } from '@nestjs/typeorm'

import { CommonModule } from './common/common.module'
import { AppController } from './app.controller'
import { PvtecModule } from './pvtec/pvtec.module'
import { UserModule } from './user/user.module'
import { HealthModule } from './health/health.module'

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: 'mongodb://root:root@127.0.0.1:45501',
      database: 'add-connect',
      authSource: 'admin',
      entities: ['dist/**/*.entity{.ts,.js}'],
      useNewUrlParser: true,
      keepConnectionAlive: true,
      synchronize: true, // TODO: do not use in prod
      logging: true, // TODO: put the log somewhere with own logging
    }),
    GraphQLModule.forRoot({
      debug: true, // TODO: disable in prod
      playground: true, // TODO: disable in prod
      typePaths: ['./**/*.graphql'],
      // autoSchemaFile: 'schema.gql',
      persistedQueries: false, // TODO: enable in prod
    }),
    CommonModule,
    HealthModule,
    UserModule,
    PvtecModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
