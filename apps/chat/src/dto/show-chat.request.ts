import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class ShowChatRequest {
  @ApiProperty({
    example: 'jdfasdfwe89',
  })
  @IsString()
  @IsNotEmpty()
  receiver: string;
}
