import {
  IsNotEmpty,
  IsNumberString,
  IsString,
} from 'class-validator';

export class CreateCandidateDto {
  @IsNotEmpty()
  @IsString()
  fullname: string;

  @IsNotEmpty()
  @IsString()
  course: string;

  @IsNotEmpty()
  @IsNumberString()
  level: number;

  @IsNotEmpty()
  @IsString()
  manifestoe: string;

  @IsNotEmpty()
  @IsString()
  position: string;
}

