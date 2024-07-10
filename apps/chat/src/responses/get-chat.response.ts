import { ApiProperty } from '@nestjs/swagger';

export class GetChatResponse {
  @ApiProperty({ example: 'Chat fetched successfully' })
  message: string;

  @ApiProperty({ example: 200 })
  statusCode: number;

  @ApiProperty({
    example: [
      {
        _id: 'dk487eue39q',
        sender: '245435hhrwerue',
        receiver: 'jdfasdfwe89',
        message: 'example message',
        deleted: false,
        read: false,
        createdAt: '2024-07-10T02:04:06.197Z',
        updatedAt: '2024-07-10T02:04:06.197Z',
      },
      {
        _id: 'dk487eue39q',
        sender: '245435hhrwerue',
        receiver: 'jdfasdfwe89',
        message: 'example message 2',
        deleted: false,
        read: false,
        createdAt: '2024-07-10T02:04:06.197Z',
        updatedAt: '2024-07-10T02:04:06.197Z',
      },
    ],
  })
  data: any;
}

export class GetUnreadChatResponse {
  @ApiProperty({ example: 'Chat fetched successfully' })
  message: string;

  @ApiProperty({ example: 200 })
  statusCode: number;

  @ApiProperty({
    example: {
      count: 2,
      chat: [
        {
          _id: 'dk487eue39q',
          sender: '245435hhrwerue',
          receiver: 'jdfasdfwe89',
          message: 'example message',
          deleted: false,
          read: false,
          createdAt: '2024-07-10T02:04:06.197Z',
          updatedAt: '2024-07-10T02:04:06.197Z',
        },
        {
          _id: 'dk487eue39q',
          sender: '245435hhrwerue',
          receiver: 'jdfasdfwe89',
          message: 'example message 2',
          deleted: false,
          read: false,
          createdAt: '2024-07-10T02:04:06.197Z',
          updatedAt: '2024-07-10T02:04:06.197Z',
        },
      ],
    },
  })
  data: any;
}
