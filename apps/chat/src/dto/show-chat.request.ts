import { IsNotEmpty, IsString, Validate } from 'class-validator';
import { IsDifferentConstraint } from './send-chat.request';

export class ShowChatRequest {
  @IsString()
  @IsNotEmpty()
  sender: string;

  @IsString()
  @IsNotEmpty()
  @Validate(IsDifferentConstraint, ['sender'])
  receiver: string;
}
