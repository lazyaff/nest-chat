import { ApiProperty } from '@nestjs/swagger';

export class LogoutResponse {
  @ApiProperty({
    example: 200,
  })
  statusCode: number;

  @ApiProperty({
    example: 'Logged out successfully',
  })
  message: string;
}
