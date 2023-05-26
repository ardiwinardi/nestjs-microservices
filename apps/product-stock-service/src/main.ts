import { NestFactory } from '@nestjs/core';

import { RedisModule } from '@nestjs-microservices/shared/module';
import { MicroserviceOptions } from '@nestjs/microservices';
import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    RedisModule
  );
  await app.listen();
}

bootstrap();
