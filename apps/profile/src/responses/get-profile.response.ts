import { ApiProperty } from '@nestjs/swagger';

export class GetProfileResponse {
  @ApiProperty({ example: 'Profile fetched successfully' })
  message: string;

  @ApiProperty({ example: 200 })
  statusCode: number;

  @ApiProperty({
    example: {
      username: 'userone',
      name: 'John Doe',
      photo_url: 'https://example.com/photo.jpg',
      gender: 'Male',
      birthday: '01/01/2000',
      age: 20,
      height: {
        value: 170,
        unit: 'cm',
      },
      weight: {
        value: 60,
        unit: 'kg',
      },
      horoscope: 'Aries',
      zodiac: 'Pig',
      interests: ['Music', 'Food'],
    },
  })
  data: any;
}
