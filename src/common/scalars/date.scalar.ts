import { CustomScalar, Scalar } from '@nestjs/graphql'
import { Kind, ValueNode } from 'graphql'
import dayjs from 'dayjs'

@Scalar('Date', () => dayjs.Dayjs)
export class DateScalar implements CustomScalar<number, dayjs.Dayjs> {
  description = 'Date dayjs custom scalar type'

  parseValue(value: number): dayjs.Dayjs {
    return dayjs(value)
  }

  serialize(value: Date): number {
    return value.getTime()
  }

  parseLiteral(ast: ValueNode): dayjs.Dayjs {
    if (ast.kind === Kind.INT) {
      return dayjs(ast.value)
    }
  }
}
