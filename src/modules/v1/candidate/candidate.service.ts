import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { uploadFile } from 'src/common/configs/cloudinary';
import { ResponseMessage } from 'src/common/constants/response';
import { CreateCandidateDto } from './dtos/create-candidate.dto';
import { Candidate, CandidateDocument } from './schema/candidate.schema';
import { helperFunction } from 'src/common/helpers/helper';

@Injectable()
export class CandidateService {
  constructor(
    @InjectModel(Candidate.name)
    private candidateModel: Model<CandidateDocument>,
  ) {}

  async getCandidates(): Promise<ResponseMessage> {
    try {
      const candidates = await this.candidateModel.find();

      return new ResponseMessage(
        true,
        candidates,
        'record fetched successfully',
      );
    } catch (e) {
      throw new InternalServerErrorException(e.message);
    }
  }

  async createCandidate(
    payload: CreateCandidateDto,
    image: Express.Multer.File,
  ): Promise<ResponseMessage> {
    try {
      let candidate: CandidateDocument;

      if (!helperFunction.isValidImage(image.filename)) {
        await helperFunction.deleteFileFromUploadFoler(image.filename);
        return new ResponseMessage(false, null, 'invalid image type');
      }

      if (image) {
        const url = await uploadFile(image.path);
        await helperFunction.deleteFileFromUploadFoler(image.filename);

        candidate = await this.candidateModel.create({
          ...payload,
          image: url,
        });
      } else {
        candidate = await this.candidateModel.create(payload);
      }

      return new ResponseMessage(
        true,
        candidate,
        'record created successfully',
      );
    } catch (e) {
      throw new InternalServerErrorException(e.message);
    }
  }
}
