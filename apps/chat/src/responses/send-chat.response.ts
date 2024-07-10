import { ApiProperty } from '@nestjs/swagger';

export class SendChatResponse {
  @ApiProperty({ example: 'Chat sent successfully' })
  message: string;

  @ApiProperty({ example: 201 })
  statusCode: number;

  @ApiProperty({
    example: {
      _id: 'dk487eue39q',
      sender: '245435hhrwerue',
      receiver: 'jdfasdfwe89',
      message: 'example message',
      deleted: false,
      read: false,
      createdAt: '2024-07-10T02:04:06.197Z',
      updatedAt: '2024-07-10T02:04:06.197Z',
    },
  })
  data: any;
}
