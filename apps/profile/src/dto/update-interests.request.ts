import { IsArray, IsString } from 'class-validator';

export class updateInterestsRequest {
  @IsArray({ message: 'interests must not be empty' })
  @IsString({ each: true })
  interests: string[];
}
