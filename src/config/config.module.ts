import { Module } from '@nestjs/common'
import { ConfigModule as ConfigModuleRoot } from '@nestjs/config'
import Joi from 'joi'

import pvtecConfig, { configAppValidation } from './app.config'
import { ConfigService } from './config.service'

/**
 * Supported environments.
 */
export const enum Environment {
  DEV = 'development',
  PROD = 'production',
}

/**
 * Application config description...
 *
 * Adding new configurations
 *
 * Duplicate `app.config.ts` and change all "App" namespaces to whatever
 * config you create. Then import it here and 1) add it to `load` and
 * 2) add the validation to `validationSchema`.
 */
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
        ...configAppValidation,
      }),
    }),
  ],
})
export class ConfigModule {}
