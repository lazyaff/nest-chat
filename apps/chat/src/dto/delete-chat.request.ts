import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class DeleteChatRequest {
  @ApiProperty({
    example: 'dk487eue39q',
  })
  @IsString()
  @IsNotEmpty()
  id: string;

  message: string;
  deleted: boolean;
}
