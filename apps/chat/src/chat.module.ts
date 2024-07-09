import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';
import { AuthModule, DatabaseModule } from '@app/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Chat, ChatSchema } from './schemas/chat.schema';
import { ChatRepository } from './chat.repository';
import { ChatGateway } from './chat.gateway';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        MONGODB_URI: Joi.string().required(),
        PORT: Joi.number().required(),
      }),
      envFilePath: './apps/chat/.env',
    }),
    DatabaseModule,
    MongooseModule.forFeature([{ name: Chat.name, schema: ChatSchema }]),
    AuthModule,
  ],
  controllers: [ChatController],
  providers: [ChatService, ChatRepository, ChatGateway],
})
export class ChatModule {}
