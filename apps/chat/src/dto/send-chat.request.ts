import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class SendChatRequest {
  sender: string;

  @ApiProperty({ example: 'jdfasdfwe89' })
  @IsString()
  @IsNotEmpty()
  receiver: string;

  @ApiProperty({ example: 'example message' })
  @IsString()
  @IsNotEmpty()
  message: string;

  deleted: boolean;
  read: boolean;
  createdAt: Date;
  updatedAt: Date;
}
