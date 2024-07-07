import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { AbstractDocument } from '@app/common';

@Schema({ versionKey: false, timestamps: true })
export class Chat extends AbstractDocument {
  @Prop({ required: true })
  sender: string;

  @Prop({ required: true })
  receiver: string;

  @Prop({ required: true })
  message: string;

  @Prop({ default: false })
  deleted: boolean;
}

export const ChatSchema = SchemaFactory.createForClass(Chat);
