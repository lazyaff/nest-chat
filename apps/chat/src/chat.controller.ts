import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  UseGuards,
  Req,
  Param,
} from '@nestjs/common';
import { ChatService } from './chat.service';
import { SendChatRequest } from './dto/send-chat.request';
import { EditChatRequest } from './dto/edit-chat.request';
import { DeleteChatRequest } from './dto/delete-chat.request';
import { JwtAuthGuard } from '@app/common';
import {
  ApiCookieAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { SendChatResponse } from './responses/send-chat.response';
import {
  getAllUnreadChatsResponse,
  GetChatResponse,
  GetChatsResponse,
  GetUnreadChatResponse,
} from './responses/get-chat.response';
import { EditChatResponse } from './responses/edit-chat.response';
import { DeleteChatResponse } from './responses/delete-chat.response';

@Controller('chat')
@ApiTags('Main')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post()
  @ApiOperation({
    summary: 'Send a chat message',
  })
  @ApiCookieAuth()
  @ApiCreatedResponse({
    description: 'Chat sent successfully',
    type: SendChatResponse,
  })
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
  @ApiOperation({
    summary: 'Get all chat messages from a user',
  })
  @ApiCookieAuth()
  @ApiOkResponse({
    description: 'Chat fetched successfully',
    type: GetChatsResponse,
  })
  @UseGuards(JwtAuthGuard)
  async getChats(@Req() req: any) {
    const data = await this.chatService.getChats(req.user._id);
    return {
      message: 'Chat fetched successfully',
      statusCode: 200,
      data,
    };
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get a chat message from a user',
  })
  @ApiCookieAuth()
  @ApiOkResponse({
    description: 'Chat fetched successfully',
    type: GetChatResponse,
  })
  @UseGuards(JwtAuthGuard)
  async getChat(@Param('id') id: string, @Req() req: any) {
    const data = await this.chatService.getChat(id, req.user._id);
    return {
      message: 'Chat fetched successfully',
      statusCode: 200,
      data,
    };
  }

  @Get('unread')
  @ApiOperation({
    summary: 'Get all unread chats message from a user',
  })
  @ApiCookieAuth()
  @ApiOkResponse({
    description: 'Chat fetched successfully',
    type: getAllUnreadChatsResponse,
  })
  @UseGuards(JwtAuthGuard)
  async getUnreadChats(@Req() req: any) {
    const data = await this.chatService.getAllUnreadChats(req.user._id);
    return {
      message: 'Chat fetched successfully',
      statusCode: 200,
      data,
    };
  }

  @Get('unread/:id')
  @ApiOperation({
    summary: 'Get unread chat message from a user',
  })
  @ApiCookieAuth()
  @ApiOkResponse({
    description: 'Chat fetched successfully',
    type: GetUnreadChatResponse,
  })
  @UseGuards(JwtAuthGuard)
  async getUnreadChat(@Param() param: any, @Req() req: any) {
    const data = await this.chatService.getUnreadChat(param.id, req.user._id);
    return {
      message: 'Chat fetched successfully',
      statusCode: 200,
      data,
    };
  }

  @Put()
  @ApiOperation({
    summary: 'Edit a chat message',
  })
  @ApiCookieAuth()
  @ApiOkResponse({
    description: 'Chat edited successfully',
    type: EditChatResponse,
  })
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
  @ApiOperation({
    summary: 'Delete a chat message',
  })
  @ApiCookieAuth()
  @ApiOkResponse({
    description: 'Chat deleted successfully',
    type: DeleteChatResponse,
  })
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
