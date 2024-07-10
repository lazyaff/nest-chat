import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class EditChatRequest {
  @ApiProperty({
    example: 'dk487eue39q',
  })
  @IsString()
  @IsNotEmpty()
  id: string;

  @ApiProperty({
    example: 'example message edited',
  })
  @IsString()
  @IsNotEmpty()
  message: string;
}
