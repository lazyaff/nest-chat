import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractDocument } from '@app/common';

@Schema({ versionKey: false, timestamps: true })
export class User extends AbstractDocument {
  @Prop({ type: String })
  name: string;

  @Prop({ type: String })
  photo_url: string;

  @Prop({ type: String })
  gender: string;

  @Prop({ type: Date })
  birthday: Date;

  @Prop({ type: { value: Number, unit: String } })
  height: {
    value: number;
    unit: string;
  };

  @Prop({ type: { value: Number, unit: String } })
  weight: {
    value: number;
    unit: string;
  };

  @Prop({ type: String })
  horoscope: string;

  @Prop({ type: String })
  zodiac: string;

  @Prop({ type: [String] })
  interests: string[];
}

export const UserSchema = SchemaFactory.createForClass(User);
