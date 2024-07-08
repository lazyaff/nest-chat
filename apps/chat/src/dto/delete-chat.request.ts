import { IsNotEmpty, IsString } from 'class-validator';

export class DeleteChatRequest {
  @IsString()
  @IsNotEmpty()
  id: string;

  deleted: boolean;
}
