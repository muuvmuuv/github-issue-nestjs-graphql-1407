import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common'
import { HttpAdapterHost } from '@nestjs/core'
import { GqlContextType } from '@nestjs/graphql'

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  /**
   * Modify the error response for HTTP requests. GraphQL is currently skipped.
   */
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  catch(exception: HttpException, host: ArgumentsHost): any {
    const contextType = host.getType() as GqlContextType

    // TODO: modify graphql response to our needs

    if (contextType === 'graphql') return

    const context = host.switchToHttp()
    const response = context.getResponse()
    const status = exception.getStatus()
    const adapter = this.httpAdapterHost.httpAdapter
    const exceptionResponse = exception.getResponse()

    const errorResponse = {
      status: status,
      message: exception.message,
      success: false,
      details: exceptionResponse,
    }

    adapter.reply(response, errorResponse, status)
  }
}
