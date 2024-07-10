import { ApiProperty } from '@nestjs/swagger';

export class EditChatResponse {
  @ApiProperty({
    example: 'Chat edited successfully',
  })
  message: string;

  @ApiProperty({
    example: 200,
  })
  statusCode: number;

  @ApiProperty({
    example: {
      _id: 'dk487eue39q',
      sender: '245435hhrwerue',
      receiver: 'jdfasdfwe89',
      message: 'example message edited',
      deleted: false,
      read: false,
      createdAt: '2024-07-10T02:04:06.197Z',
      updatedAt: '2024-07-10T02:04:06.197Z',
    },
  })
  data: any;
}
