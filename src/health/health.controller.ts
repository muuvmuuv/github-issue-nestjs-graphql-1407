import { Controller, Get } from '@nestjs/common'
import {
  HealthCheck,
  HealthCheckResult,
  HealthCheckService,
  TypeOrmHealthIndicator,
} from '@nestjs/terminus'

@Controller('health')
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private database: TypeOrmHealthIndicator
  ) {}

  @Get()
  @HealthCheck()
  healthCheck(): Promise<HealthCheckResult> {
    return this.health.check([async () => this.database.pingCheck('pvtec')])
  }
}
