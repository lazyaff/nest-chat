import { Body, Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { ChatService } from './chat.service';
import { SendChatRequest } from './dto/send-chat.request';
import { ShowChatRequest } from './dto/show-chat.request';
import { EditChatRequest } from './dto/edit-chat.request';
import { DeleteChatRequest } from './dto/delete-chat.request';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post()
  async sendChat(@Body() request: SendChatRequest) {
    const data = await this.chatService.sendChat(request);
    return {
      message: 'Chat sent successfully',
      statusCode: 201,
      data,
    };
  }

  @Get()
  async getChat(@Body() request: ShowChatRequest) {
    const data = await this.chatService.getChat(request);
    return {
      message: 'Chat fetched successfully',
      statusCode: 200,
      data,
    };
  }

  @Get('unread')
  async getUnreadChat(@Body() request: ShowChatRequest) {
    const data = await this.chatService.getUnreadChat(request);
    return {
      message: 'Chat fetched successfully',
      statusCode: 200,
      data,
    };
  }

  @Put()
  async editChat(@Body() request: EditChatRequest) {
    const data = await this.chatService.editChat(request);
    return {
      message: 'Chat edited successfully',
      statusCode: 200,
      data,
    };
  }

  @Delete()
  async deleteChat(@Body() request: DeleteChatRequest) {
    const data = await this.chatService.deleteChat(request);
    return {
      message: 'Chat deleted successfully',
      statusCode: 200,
      data,
    };
  }
}
