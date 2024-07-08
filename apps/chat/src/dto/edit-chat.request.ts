import { IsNotEmpty, IsString } from 'class-validator';

export class EditChatRequest {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  message: string;
}
