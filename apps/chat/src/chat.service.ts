import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { SendChatRequest } from './dto/send-chat.request';
import { ChatRepository } from './chat.repository';
import { ShowChatRequest } from './dto/show-chat.request';
import { EditChatRequest } from './dto/edit-chat.request';
import { DeleteChatRequest } from './dto/delete-chat.request';

@Injectable()
export class ChatService {
  constructor(private readonly chatRepository: ChatRepository) {}

  async sendChat(request: SendChatRequest) {
    request = { ...request, createdAt: new Date(), updatedAt: new Date() };
    return await this.chatRepository.create(request);
  }

  async getChat(request: ShowChatRequest) {
    // mark chat as read
    await this.readMessage(request.receiver, request.sender);

    return await this.chatRepository.find({
      $or: [
        { sender: request.sender, receiver: request.receiver },
        { sender: request.receiver, receiver: request.sender },
      ],
    });
  }

  async getUnreadChat(request: ShowChatRequest) {
    const chat = await this.chatRepository.find({
      sender: request.receiver,
      receiver: request.sender,
      read: false,
    });

    return {
      count: chat.length,
      chat,
    };
  }

  async editChat(request: EditChatRequest) {
    const chat = await this.chatRepository.findOne({
      _id: request.id,
    });

    // check if chat exists
    if (!chat) {
      throw new NotFoundException('Chat not found');
    }

    // check if message is older than 1 hour
    if (!this.isWithinOneHour(chat.createdAt)) {
      throw new BadRequestException(
        'Message can only be deleted within one hour of being sent',
      );
    }

    return await this.chatRepository.findOneAndUpdate(
      {
        _id: request.id,
      },
      request,
    );
  }

  async deleteChat(request: DeleteChatRequest) {
    const chat = await this.chatRepository.findOne({
      _id: request.id,
    });

    // check if chat exists
    if (!chat) {
      throw new NotFoundException('Chat not found');
    }

    // check if message is older than 1 hour
    if (!this.isWithinOneHour(chat.createdAt)) {
      throw new BadRequestException(
        'Message can only be deleted within one hour of being sent',
      );
    }

    request = { ...request, deleted: true };
    return await this.chatRepository.findOneAndUpdate(
      {
        _id: request.id,
      },
      request,
    );
  }

  private isWithinOneHour(timestamp: Date): boolean {
    const oneHour = 60 * 60 * 1000;
    const now = new Date().getTime();
    const messageTime = new Date(timestamp).getTime();
    return now - messageTime <= oneHour;
  }

  private async readMessage(sender: string, receiver: string) {
    return await this.chatRepository.findManyAndUpdate(
      {
        sender: sender,
        receiver: receiver,
      },
      {
        read: true,
      },
    );
  }
}
