import path from 'path'

import { TypeOrmModule } from '@nestjs/typeorm'

import { CONFIG_KEY_APP } from 'src/config/app.config'
import { ConfigModule } from 'src/config/config.module'
import { ConfigService } from 'src/config/config.service'
import { rootPath } from 'src/utils'

export const AppDatabase = TypeOrmModule.forRootAsync({
  name: CONFIG_KEY_APP,
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: (config: ConfigService) => ({
    type: 'mongodb',
    url: config.get('app.mongoDsn'),
    database: config.get('app.database'),
    authSource: 'admin',
    entities: [path.join(rootPath, '**/*.model.js')],
    useNewUrlParser: true,
    keepConnectionAlive: ConfigService.isDevelopment,
    synchronize: ConfigService.isDevelopment,
    logging: ConfigService.isDevelopment,
  }),
})
