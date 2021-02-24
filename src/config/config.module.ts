import { Module } from '@nestjs/common'
import { ConfigModule as ConfigModuleRoot } from '@nestjs/config'
import Joi from 'joi'

import { ConfigService } from './config.service'
import pvtecConfig, { configPvtecValidation } from './pvtec.config'

/**
 * Supported environments.
 */
export const enum Environment {
  DEV = 'development',
  PROD = 'production',
}

@Module({
  imports: [
    ConfigModuleRoot.forRoot({
      load: [pvtecConfig],
      isGlobal: true,
      cache: ConfigService.isProduction,
      expandVariables: true,
      validationOptions: {
        abortEarly: true,
      },
      validationSchema: Joi.object({
        NODE_ENV: Joi.string()
          .valid(Environment.DEV, Environment.PROD)
          .default(Environment.PROD),
        PORT: Joi.number().default(3000),
        ...configPvtecValidation,
      }),
    }),
  ],
})
export class ConfigModule {}
