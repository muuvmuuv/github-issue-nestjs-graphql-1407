import { Controller, Get, HttpCode } from '@nestjs/common'

import { name, version } from '../package.json'

interface GetVersion {
  code: number
  message: string // combined version message
  data: {
    version: string // app version
    hash: string // latest git hash
    env: string // current env
    name: string // application name
  }
}

@Controller()
export class AppController {
  /**
   * Simply avoid 404 on direct API access. Can be used
   * to check if the API is ONLINE.
   */
  @Get()
  @HttpCode(200)
  ping(): string {
    return 'OK'
  }

  /**
   * Return some information about the currently active API instance.
   */
  @Get('version')
  @HttpCode(200)
  version(): GetVersion {
    return {
      code: 200,
      message: ``,
      data: {
        version: version,
        hash: 'XXXXXXXXXXXXXXXX',
        env: process.env.NODE_ENV,
        name: name,
      },
    }
  }
}
