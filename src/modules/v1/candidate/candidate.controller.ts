import {
  Body,
  Controller,
  Get,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { Roles } from 'src/common/decorators';
import { helperFunction } from 'src/common/helpers/helper';
import { CandidateService } from './candidate.service';
import { CreateCandidateDto } from './dtos/create-candidate.dto';
import * as path from 'path';
import { Request } from 'express';

@Controller('candidate')
export class CandidateController {
  constructor(private readonly candidateService: CandidateService) {}

  @Roles('admin')
  @Get()
  async getCandidates() {
    return await this.candidateService.getCandidates();
  }

  @Roles('admin')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req: Request, file: Express.Multer.File, cb: any) => {
          const filename = helperFunction.generateRandomString(20);
          const fileExt = path.parse(file.originalname).ext;

          cb(null, `${filename}${fileExt}`);
        },
      }),
    }),
  )
  @Post()
  async createCandidate(
    @Body() payload: CreateCandidateDto,
    @UploadedFile() image: Express.Multer.File,
  ) {
    return await this.candidateService.createCandidate(payload, image);
  }
}
