import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateOtpDto {
  @IsNotEmpty()
  @IsString()
  otp: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;
}
