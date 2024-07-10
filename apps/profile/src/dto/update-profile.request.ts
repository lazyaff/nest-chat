import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsISO8601,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsString,
  IsUrl,
  Matches,
  ValidateNested,
} from 'class-validator';

class HeightDTO {
  @IsNotEmpty({ message: 'Height value should not be empty' })
  @IsNumber()
  value: number;

  @IsNotEmpty({ message: 'Height unit should not be empty' })
  @IsString()
  unit: string;
}

class WeightDTO {
  @IsNotEmpty({ message: 'Weight value should not be empty' })
  @IsNumber()
  value: number;

  @IsNotEmpty({ message: 'Weight unit should not be empty' })
  @IsString()
  unit: string;
}

export class UpdateProfileRequest {
  @ApiProperty({ example: 'John' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'https://example.com/photo.jpg' })
  @IsUrl()
  @IsNotEmpty()
  photo_url: string;

  @ApiProperty({ example: 'Male' })
  @IsNotEmpty()
  @Matches(/^(Male|Female)$/, { message: 'Gender should be Male or Female' })
  gender: string;

  @ApiProperty({ example: '2020-01-01' })
  @IsISO8601(
    {},
    { message: 'Birthday should be an string in YYYY-MM-DD format' },
  )
  @IsNotEmpty()
  birthday: Date;

  @ApiProperty({ example: { value: 180, unit: 'cm' } })
  @IsObject({ message: 'Height should be an object with value and unit' })
  @ValidateNested()
  @Type(() => HeightDTO)
  height: HeightDTO;

  @ApiProperty({ example: { value: 70, unit: 'kg' } })
  @IsObject({ message: 'Weight should be an object with value and unit' })
  @ValidateNested()
  @Type(() => WeightDTO)
  weight: WeightDTO;
}
