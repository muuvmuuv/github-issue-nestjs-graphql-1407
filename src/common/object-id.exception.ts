import { HttpException, HttpStatus } from '@nestjs/common'

/**
 * Throw an ObjectId exception.
 */
export class ObjectIdException extends HttpException {
  constructor() {
    super('Not a valid ObjectId', HttpStatus.UNPROCESSABLE_ENTITY)
  }
}
