'use strict'

import fs from 'fs'
import http2 from 'http2'

import { NestFactory } from '@nestjs/core'
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { FastifyHttp2SecureOptions } from 'fastify'
import compression from 'fastify-compress'
import cookies from 'fastify-cookie'
import csrf from 'fastify-csrf'
import eTag from 'fastify-etag'
import helmet from 'fastify-helmet'
import rateLimit from 'fastify-rate-limit'

import { description, name, version } from '../package.json'
import { AppModule } from './app.module'
import welcome from './common/welcome'
import { ConfigService } from './config/config.service'

async function bootstrap() {
  // BUG: not working with GraphQL for some reason
  const secureOptions: FastifyHttp2SecureOptions<http2.Http2SecureServer> = {
    http2: true,
    https: {
      key: fs.readFileSync('./certs/certificate.key'),
      cert: fs.readFileSync('./certs/certificate.crt'),
    },
  }

  const adapter = new FastifyAdapter({
    // ...secureOptions,
    logger: {
      level: ConfigService.isDevelopment ? 'debug' : 'info',
      prettyPrint: ConfigService.isDevelopment,
    },
  })

  const app = await NestFactory.create<NestFastifyApplication>(AppModule, adapter)
  const config = app.get(ConfigService)

  const swaggerConfig = new DocumentBuilder()
    .setTitle(name)
    .setDescription(description)
    .setVersion(version)
    .build()
  const document = SwaggerModule.createDocument(app, swaggerConfig)
  SwaggerModule.setup('docs', app, document)

  app.enableCors({
    origin: true,
  })

  app.register(compression)
  app.register(helmet, {
    contentSecurityPolicy: {
      reportOnly: ConfigService.isDevelopment,
    },
  })
  app.register(cookies, {
    secret: config.get('COOKIE_SECRET', 'no-secret'),
  })
  app.register(csrf)
  app.register(eTag)
  app.register(rateLimit, {
    timeWindow: '1 minute',
    max: 100,
  })
  // BUG: https://github.com/piscinajs/fastify-piscina/issues/7
  // app.register(piscina, {
  //   filename: path.join(rootPath, 'worker.js'),
  // })

  await app.listen(config.get('PORT'))
}

welcome()
bootstrap()
