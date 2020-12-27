import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({
      logger: { level: 'info' },
    }),
  );

  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({ origin: true });

  await app.listen(3000);
}
bootstrap();
