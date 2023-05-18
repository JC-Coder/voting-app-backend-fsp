import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class AdminSignupDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsString()
  confirmPassword: string;

  @IsNotEmpty()
  @IsString()
  adminSecret: string;
}

