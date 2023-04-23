import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { ILoggedInUser, LoggedInUser, Roles } from 'src/common/decorators';
import { helperFunction } from 'src/common/helpers/helper';
import { CandidateService } from './candidate.service';
import { CreateCandidateDto } from './dtos/create-candidate.dto';
import * as path from 'path';
import { Request } from 'express';
import { UpdateCandidateDto } from './dtos/update-candidate.dto';
import { IResponseMessage } from 'src/common/constants/response';

@Controller('candidate')
export class CandidateController {
  constructor(private readonly candidateService: CandidateService) {}

  @Get()
  async getCandidates() {
    return await this.candidateService.getCandidates();
  }

  @Get('position')
  async getCandidateByPosition(
    @Query('position') position: string,
  ): Promise<IResponseMessage> {
    return await this.candidateService.getCandidateByPosition(position);
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

  @Patch(':id')
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
  async updateCandidate(
    @Param('id') id: string,
    @Body() payload: UpdateCandidateDto,
    @UploadedFile() image: Express.Multer.File,
  ) {
    return await this.candidateService.updateCandidate(id, payload, image);
  }

  @Delete(':id')
  @Roles('admin')
  async deleteCandidate(@Param('id') id: string) {
    return await this.candidateService.deleteCandidate(id);
  }

  @Post('vote/:id')
  async voteCandidate(
    @Param('id') id: string,
    @LoggedInUser() user: ILoggedInUser,
  ) {
    return await this.candidateService.voteCandidate(id, user.userId);
  }

  @Get('top')
  async getTopCandidates() {
    return await this.candidateService.getTopCandidates();
  }
}
