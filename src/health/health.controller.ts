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

import { CONFIG_KEY_PVTEC } from '../config/pvtec.config'

@Controller('health')
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private database: TypeOrmHealthIndicator,
    private http: HttpHealthIndicator,
    //
    // Connections
    //
    @InjectConnection(CONFIG_KEY_PVTEC)
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
        this.database.pingCheck(CONFIG_KEY_PVTEC, {
          connection: this.databaseOneConnection,
        }),
    ])
  }
}
