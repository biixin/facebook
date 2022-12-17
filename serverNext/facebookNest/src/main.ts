import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { appErrorHandler } from './errors/appErrorHandler';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  

  app.useGlobalPipes(new ValidationPipe())
  app.use(appErrorHandler)

  await app.listen(3000);
}

bootstrap();
