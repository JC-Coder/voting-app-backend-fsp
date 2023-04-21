import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { UserRoleEnum } from 'src/common/enums/userRole.enum';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  @Prop()
  firstname: string;

  @Prop()
  lastname: string;

  @Prop({ required: true, trim: true, lowercase: true, unique: true })
  email: string;

  @Prop({ type: String, enum: UserRoleEnum, default: UserRoleEnum.USER })
  role: UserRoleEnum;

  @Prop({ required: false })
  loginPassword: string;

  @Prop()
  loginPasswordExpiresIn: number;

  @Prop({ required: true })
  matricNo: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
