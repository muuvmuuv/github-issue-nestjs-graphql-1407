import { join } from 'path'

import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'

@Module({
  imports: [
    GraphQLModule.forRoot({
      debug: true,
      playground: true,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
      persistedQueries: false,
    }),
  ],
})
export class AppModule {}
