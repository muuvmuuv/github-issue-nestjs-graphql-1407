import { Module } from '@nestjs/common'

import { DateScalar } from './scalars/date.scalar'

/**
 * Commonly (application wide) used stuff goes here.
 */
@Module({
  providers: [DateScalar],
})
export class CommonModule {}
