import { NestFactory } from '@nestjs/core'
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import compression from 'fastify-compress'
import { Logger } from '@nestjs/common'

import { description, name, version } from '../package.json'
import { AppModule } from './app.module'

async function bootstrap() {
  const adapter = new FastifyAdapter({
    logger: {
      level: 'info',
      prettyPrint: true,
    },
  })

  const app = await NestFactory.create<NestFastifyApplication>(AppModule, adapter)

  const config = new DocumentBuilder()
    .setTitle(name)
    .setDescription(description)
    .setVersion(version)
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api', app, document)

  app.register(compression)

  await app.listen(3000)

  Logger.log(`🚀 Server running on http://localhost:${3000}`, 'Bootstrap')
}

bootstrap()
