import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type OtpDocument = Otp & Document;

@Schema({ timestamps: true })
export class Otp {
  @Prop({ required: true })
  otp: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  expiresIn: Date;
}

export const OtpSchema = SchemaFactory.createForClass(Otp)