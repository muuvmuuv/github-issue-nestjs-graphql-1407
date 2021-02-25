import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { AppDatabase } from './app.database'

/**
 * The database module holds all connectable databases. Refer to `app.database.ts`
 * if you want to connect a new database through TypeORM.
 *
 * If you add a new database connection, please also add it to our health service
 * in `health/health.controller.ts`.
 */
@Module({
  imports: [AppDatabase],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
