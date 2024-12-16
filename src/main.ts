import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';
import { envs } from './configs/envs';

async function bootstrap() {
  const logger = new Logger('NestApplication');
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.TCP,
    options: {
      port: envs.PORT,
    },
  });

  await app.listen();
  logger.log(`Orders MS is running on: http://localhost:${envs.PORT}`);
}
bootstrap();
