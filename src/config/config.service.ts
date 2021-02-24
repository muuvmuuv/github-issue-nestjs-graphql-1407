import { Injectable } from '@nestjs/common'
import { ConfigService as NestConfigService } from '@nestjs/config'

import { Environment } from './config.module'

@Injectable()
export class ConfigService extends NestConfigService {
  static get isDevelopment(): boolean {
    return process.env.NODE_ENV === Environment.DEV
  }
  static get isProduction(): boolean {
    return process.env.NODE_ENV === Environment.DEV
  }
}
