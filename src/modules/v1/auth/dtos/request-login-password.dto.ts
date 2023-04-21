import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class RequestLoginPasswordDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  matricNo: string;
}
