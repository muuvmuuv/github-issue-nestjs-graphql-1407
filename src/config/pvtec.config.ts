import { registerAs } from '@nestjs/config'
import Joi from 'joi'

export const CONFIG_KEY_PVTEC = 'pvtec'

export interface ConfigPvtec {
  mongoDsn: string
  database: string
}

export const configPvtecValidation = {
  PVTEC_MONGO_DSN: Joi.exist(), // TODO: add validation to make sure its a valid mongo dsn
  PVTEC_MONGO_DATABASE: Joi.string(),
}

export default registerAs(
  CONFIG_KEY_PVTEC,
  (): ConfigPvtec => ({
    mongoDsn: process.env.PVTEC_MONGO_DSN,
    database: process.env.PVTEC_MONGO_DATABASE,
  })
)
