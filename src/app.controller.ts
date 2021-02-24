import { Controller, Get, HttpCode } from '@nestjs/common'

@Controller()
export class AppController {
  @Get()
  @HttpCode(200)
  ping(): null {
    // eslint-disable-next-line unicorn/no-null
    return null
  }
}
