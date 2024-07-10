import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { SendChatRequest } from './dto/send-chat.request';
import { ChatRepository } from './chat.repository';
import { EditChatRequest } from './dto/edit-chat.request';
import { DeleteChatRequest } from './dto/delete-chat.request';
import { ClientProxy } from '@nestjs/microservices';
import { ChatGateway } from './chat.gateway';

@Injectable()
export class ChatService {
  private client: ClientProxy;
  constructor(
    private readonly chatRepository: ChatRepository,
    private readonly chatGateway: ChatGateway,
  ) {}

  async sendChat(request: SendChatRequest, id: string) {
    request = {
      ...request,
      sender: id,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    // check if sender and receiver are same
    this.isSameUser(request.sender, request.receiver);

    const data = await this.chatRepository.create(request);

    // Trigger emit ke WebSocketGateway jika chat berhasil disimpan
    const { sender, receiver } = data;
    const content = await this.getUnreadChats(receiver);
    this.chatGateway.server
      .to(receiver)
      .emit('newChat', { sender, receiver, content });

    return data;
  }

  async getChat(receiver: string, sender: string) {
    // check if sender and receiver are same
    this.isSameUser(sender, receiver);

    // mark chat as read
    await this.readMessage(receiver, sender);

    return await this.chatRepository.find({
      $or: [
        { sender: sender, receiver: receiver },
        { sender: receiver, receiver: sender },
      ],
    });
  }

  async getChats(id: string) {
    const chats = await this.chatRepository.find({
      $or: [{ sender: id }, { receiver: id }],
    });

    const groupedChats = chats.reduce((acc, curr) => {
      const key = curr.sender === id ? curr.receiver : curr.sender;
      const group = acc.find((g) => g.user === key);
      if (group) {
        group.messages.push(curr);
        if (!curr.read && curr.sender !== id) {
          group.unread++;
        }
      } else {
        acc.push({
          user: key,
          messages: [curr],
          unread: !curr.read && curr.sender !== id ? 1 : 0,
        });
      }
      return acc;
    }, []);

    return groupedChats;
  }

  async getUnreadChat(receiver: string, sender: string) {
    // check if sender and receiver are same
    this.isSameUser(sender, receiver);

    const chat = await this.chatRepository.find({
      sender: receiver,
      receiver: sender,
      read: false,
    });

    return {
      count: chat.length,
      chat,
    };
  }

  async getAllUnreadChats(id: string) {
    const chats = await this.chatRepository.find({
      receiver: id,
      read: false,
    });

    const groupedChats = chats.reduce((acc, curr) => {
      const key = curr.sender === id ? curr.receiver : curr.sender;
      const group = acc.find((g) => g.user === key);
      if (group) {
        group.messages.push(curr);
        if (!curr.read && curr.sender !== id) {
          group.unread++;
        }
      } else {
        acc.push({
          user: key,
          messages: [curr],
          unread: !curr.read && curr.sender !== id ? 1 : 0,
        });
      }
      return acc;
    }, []);

    return groupedChats;
  }

  async getUnreadChats(id: string) {
    const chat = await this.chatRepository.find({
      receiver: id,
      read: false,
    });

    const groupedChat = chat.reduce((acc, curr) => {
      const sender = curr.sender;
      if (!acc[sender]) {
        acc[sender] = {
          messages: [],
          count: 0,
        };
      }
      acc[sender].messages.push(curr);
      acc[sender].count++;
      return acc;
    }, {});

    return groupedChat;
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
