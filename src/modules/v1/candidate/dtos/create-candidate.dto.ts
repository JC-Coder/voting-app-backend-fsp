import {
  IsNotEmpty,
  IsNumberString,
  IsOptional,
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

export class UpdateCandidateDto {
  @IsOptional()
  @IsString()
  fullname: string;

  @IsOptional()
  @IsString()
  course: string;

  @IsOptional()
  @IsNumberString()
  level: number;

  @IsOptional()
  @IsString()
  manifestoe: string;

  @IsOptional()
  @IsString()
  position: string;
}
