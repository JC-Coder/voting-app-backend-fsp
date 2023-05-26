import {  IsEmail, IsNotEmpty, IsString, Matches } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  firstname: string;

  @IsNotEmpty()
  @IsString()
  lastname: string;

  @IsNotEmpty()
  @IsEmail()
  // @Matches(/^[\w.-]+@stu\.cu\.edu\.ng$/, {message: 'Invalid email'})
  email: string;

  @IsNotEmpty()
  @IsString()
  // @Matches(/^\d{2}(ck|cj)\d{4,8}$/, {message: 'Invalid matric no'})
  matricNo: string;
}
