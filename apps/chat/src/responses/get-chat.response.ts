import { ApiProperty } from '@nestjs/swagger';

export class GetChatsResponse {
  @ApiProperty({ example: 'Chats fetched successfully' })
  message: string;

  @ApiProperty({ example: 200 })
  statusCode: number;

  @ApiProperty({
    example: [
      {
        user: 'user1',
        messages: [
          {
            _id: '668b673da4c413a42aa2b58a',
            sender: 'user2',
            receiver: 'user1',
            message: 'testing lagi',
            deleted: false,
            read: false,
            createdAt: '2024-07-08T04:12:45.585Z',
            updatedAt: '2024-07-08T04:13:47.046Z',
          },
          {
            _id: '668b66cca4c413a42aa2b577',
            sender: 'user2',
            receiver: 'user1',
            message: 'chat dari user 2 yang ketiga',
            deleted: false,
            read: true,
            createdAt: '2024-07-08T04:10:52.123Z',
            updatedAt: '2024-07-08T04:11:50.454Z',
          },
          {
            _id: '668b6339fee808551e39212c',
            sender: 'user1',
            receiver: 'user2',
            message: 'chat dari user 1',
            deleted: false,
            read: false,
            createdAt: '2024-07-08T03:53:58.000Z',
            updatedAt: '2024-07-08T04:12:12.246Z',
          },
        ],
        unread: 1,
      },
      {
        user: 'user3',
        messages: [
          {
            _id: '668b6507e51ecb163b3d6c8d',
            sender: 'user3',
            receiver: 'user2',
            message: 'chat dari user 1 yang kedua',
            deleted: false,
            read: true,
            createdAt: '2024-07-08T04:03:05.000Z',
            updatedAt: '2024-07-08T04:12:12.246Z',
          },
        ],
        unread: 0,
      },
    ],
  })
  data: any;
}

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

export class getAllUnreadChatsResponse {
  @ApiProperty({ example: 'Chat fetched successfully' })
  message: string;

  @ApiProperty({ example: 200 })
  statusCode: number;

  @ApiProperty({
    example: [
      {
        user: 'user1',
        messages: [
          {
            _id: '668b6339fee808551e39212c',
            sender: 'user1',
            receiver: 'user2',
            message: 'chat dari user 1',
            deleted: false,
            read: false,
            createdAt: '2024-07-08T03:53:58.000Z',
            updatedAt: '2024-07-08T04:12:12.246Z',
          },
        ],
        unread: 1,
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
