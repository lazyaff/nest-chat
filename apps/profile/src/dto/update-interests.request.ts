import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsString } from 'class-validator';

export class updateInterestsRequest {
  @ApiProperty({
    type: [String],
    example: ['sports', 'music'],
  })
  @IsArray({ message: 'interests must not be empty' })
  @IsString({ each: true })
  interests: string[];
}
