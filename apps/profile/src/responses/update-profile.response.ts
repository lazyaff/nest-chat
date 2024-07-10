import { ApiProperty } from '@nestjs/swagger';

export class UpdateProfileResponse {
  @ApiProperty({ example: 'Profile updated successfully' })
  message: string;

  @ApiProperty({ example: 200 })
  statusCode: number;

  @ApiProperty({
    example: {
      username: 'userone',
      name: 'John',
      photo_url: 'https://example.com/photo.jpg',
      gender: 'Male',
      birthday: '01/01/2000',
      age: 24,
      height: {
        value: 180,
        unit: 'cm',
      },
      weight: {
        value: 70,
        unit: 'kg',
      },
      horoscope: 'Aries',
      zodiac: 'Pig',
      interests: ['Music', 'Food'],
    },
  })
  data: any;
}
