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
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class ChatService {
  private client: ClientProxy;
  constructor(private readonly chatRepository: ChatRepository) {}

  async sendChat(request: SendChatRequest, id: string) {
    request = {
      ...request,
      sender: id,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    // check if sender and receiver are same
    this.isSameUser(request.sender, request.receiver);

    return await this.chatRepository.create(request);
  }

  async getChat(request: ShowChatRequest, id: string) {
    // check if sender and receiver are same
    this.isSameUser(id, request.receiver);

    // mark chat as read
    await this.readMessage(request.receiver, id);

    return await this.chatRepository.find({
      $or: [
        { sender: id, receiver: request.receiver },
        { sender: request.receiver, receiver: id },
      ],
    });
  }

  async getUnreadChat(request: ShowChatRequest, id: string) {
    // check if sender and receiver are same
    this.isSameUser(id, request.receiver);

    const chat = await this.chatRepository.find({
      sender: request.receiver,
      receiver: id,
      read: false,
    });

    return {
      count: chat.length,
      chat,
    };
  }

  async editChat(request: EditChatRequest, id: string) {
    const chat = await this.chatRepository.findOne({
      _id: request.id,
      sender: id,
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

  async deleteChat(request: DeleteChatRequest, id: string) {
    const chat = await this.chatRepository.findOne({
      _id: request.id,
      sender: id,
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

    request = { ...request, message: '', deleted: true };
    return await this.chatRepository.findOneAndUpdate(
      {
        _id: request.id,
      },
      request,
    );
  }

  private isSameUser(sender: string, receiver: string) {
    if (sender === receiver)
      throw new BadRequestException('You cannot send message to yourself');
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
