import { IsNotEmpty, IsString } from 'class-validator';

export class SendChatRequest {
  sender: string;

  @IsString()
  @IsNotEmpty()
  receiver: string;

  @IsString()
  @IsNotEmpty()
  message: string;

  deleted: boolean;
  read: boolean;
  createdAt: Date;
  updatedAt: Date;
}
