import { NestFactory } from '@nestjs/core';
import { ChatModule } from './chat.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as cors from 'cors';

async function bootstrap() {
  const app = await NestFactory.create(ChatModule);

  app.useGlobalPipes(new ValidationPipe());
  const configService = app.get(ConfigService);
  app.use(
    cors({
      origin: configService.get('CLIENT_ORIGIN'),
      credentials: true,
    }),
  );
  await app.listen(configService.get('PORT'));
}
bootstrap();
