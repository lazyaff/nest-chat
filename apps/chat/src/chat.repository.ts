import { AbstractRepository } from '@app/common';
import { Injectable, Logger } from '@nestjs/common';
import { Chat } from './schemas/chat.schema';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';

@Injectable()
export class ChatRepository extends AbstractRepository<Chat> {
  protected readonly logger = new Logger(ChatRepository.name);

  constructor(
    @InjectModel(Chat.name) chatModel: Model<Chat>,
    @InjectConnection() connection: Connection,
  ) {
    super(chatModel, connection);
  }
}
