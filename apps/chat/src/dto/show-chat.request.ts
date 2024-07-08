import { IsNotEmpty, IsString } from 'class-validator';

export class ShowChatRequest {
  @IsString()
  @IsNotEmpty()
  receiver: string;
}
