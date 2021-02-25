import { registerAs } from '@nestjs/config'
import Joi from 'joi'

export const CONFIG_KEY_APP = 'app'

export interface ConfigApp {
  mongoDsn: string
  database: string
}

export const configAppValidation = {
  APP_MONGO_DSN: Joi.string().uri({
    scheme: ['mongodb'],
  }),
  APP_MONGO_DATABASE: Joi.string(),
}

export default registerAs(
  CONFIG_KEY_APP,
  (): ConfigApp => ({
    mongoDsn: process.env.APP_MONGO_DSN,
    database: process.env.APP_MONGO_DATABASE,
  })
)
