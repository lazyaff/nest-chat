import { NestFactory } from '@nestjs/core';
import { ChatModule } from './chat.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as cors from 'cors';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

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
  const config = new DocumentBuilder()
    .setTitle('Chat Service')
    .setDescription(
      'This API provides comprehensive documentation for the chat service. You can find endpoints, methods, and usage examples to integrate chat functionality into your application.',
    )
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);
  await app.listen(configService.get('PORT'));
}
bootstrap();
