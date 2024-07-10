import { ApiProperty } from '@nestjs/swagger';

export class RegisterResponse {
  @ApiProperty({
    example: 201,
  })
  statusCode: number;

  @ApiProperty({
    example: 'Registration success',
  })
  message: string;

  @ApiProperty({
    example: {
      id: 'dfds8wehw9w',
      username: 'userone',
      email: 'userone@example.com',
    },
  })
  data: any;
}
