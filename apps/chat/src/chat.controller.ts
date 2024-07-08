import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  UseGuards,
  Req,
} from '@nestjs/common';
import { ChatService } from './chat.service';
import { SendChatRequest } from './dto/send-chat.request';
import { ShowChatRequest } from './dto/show-chat.request';
import { EditChatRequest } from './dto/edit-chat.request';
import { DeleteChatRequest } from './dto/delete-chat.request';
import { JwtAuthGuard } from '@app/common';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async sendChat(@Body() request: SendChatRequest, @Req() req: any) {
    const data = await this.chatService.sendChat(request, req.user._id);
    return {
      message: 'Chat sent successfully',
      statusCode: 201,
      data,
    };
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async getChat(@Body() request: ShowChatRequest, @Req() req: any) {
    const data = await this.chatService.getChat(request, req.user._id);
    return {
      message: 'Chat fetched successfully',
      statusCode: 200,
      data,
    };
  }

  @Get('unread')
  @UseGuards(JwtAuthGuard)
  async getUnreadChat(@Body() request: ShowChatRequest, @Req() req: any) {
    const data = await this.chatService.getUnreadChat(request, req.user._id);
    return {
      message: 'Chat fetched successfully',
      statusCode: 200,
      data,
    };
  }

  @Put()
  @UseGuards(JwtAuthGuard)
  async editChat(@Body() request: EditChatRequest, @Req() req: any) {
    const data = await this.chatService.editChat(request, req.user._id);
    return {
      message: 'Chat edited successfully',
      statusCode: 200,
      data,
    };
  }

  @Delete()
  @UseGuards(JwtAuthGuard)
  async deleteChat(@Body() request: DeleteChatRequest, @Req() req: any) {
    const data = await this.chatService.deleteChat(request, req.user._id);
    return {
      message: 'Chat deleted successfully',
      statusCode: 200,
      data,
    };
  }
}
