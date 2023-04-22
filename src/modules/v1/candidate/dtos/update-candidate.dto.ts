import { IsOptional, IsString, IsNumberString } from "class-validator";

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