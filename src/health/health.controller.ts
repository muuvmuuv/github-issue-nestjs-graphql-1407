import { Controller, Get } from '@nestjs/common'
import {
  HealthCheck,
  HealthCheckResult,
  HealthCheckService,
  HttpHealthIndicator,
  TypeOrmHealthIndicator,
} from '@nestjs/terminus'
import { InjectConnection } from '@nestjs/typeorm'
import { Connection } from 'typeorm'

import { CONFIG_KEY_APP } from '../config/app.config'

@Controller('health')
export class HealthController {
  /**
   * It is nice to know how healthy our application is so this returns some checks.
   *
   * To add new checks simply duplicate one of the below. Please note that you need
   * to include the connection from your TypeORM intergration here too!
   */
  constructor(
    private health: HealthCheckService,
    private database: TypeOrmHealthIndicator,
    private http: HttpHealthIndicator,
    //
    // Connections
    //
    @InjectConnection(CONFIG_KEY_APP)
    private databaseOneConnection: Connection
  ) {}

  @Get()
  @HealthCheck()
  healthCheck(): Promise<HealthCheckResult> {
    return this.health.check([
      () =>
        this.http.pingCheck('intranet', 'http://isegit.rz.additive-net.de/', {
          timeout: 1000,
        }),
      () =>
        this.database.pingCheck(CONFIG_KEY_APP, {
          connection: this.databaseOneConnection,
        }),
    ])
  }
}
