import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { uploadFile } from 'src/common/configs/cloudinary';
import {
  IResponseMessage,
  ResponseMessage,
} from 'src/common/constants/response';
import { CreateCandidateDto } from './dtos/create-candidate.dto';
import { Candidate, CandidateDocument } from './schema/candidate.schema';
import { helperFunction } from 'src/common/helpers/helper';
import { UpdateCandidateDto } from './dtos/update-candidate.dto';

@Injectable()
export class CandidateService {
  constructor(
    @InjectModel(Candidate.name)
    private candidateModel: Model<CandidateDocument>,
  ) {}

  async getCandidates(): Promise<IResponseMessage> {
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
  ): Promise<IResponseMessage> {
    try {
      let candidate: CandidateDocument;

      if (image && !helperFunction.isValidImage(image.filename)) {
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

  async updateCandidate(
    id: string,
    payload: UpdateCandidateDto,
    image: Express.Multer.File,
  ): Promise<IResponseMessage> {
    try {
      const { fullname, course, level, manifestoe, position } = payload;

      if (image && !helperFunction.isValidImage(image.filename)) {
        await helperFunction.deleteFileFromUploadFoler(image.filename);
        return new ResponseMessage(false, null, 'invalid image type');
      }

      let result: any;

      if (image) {
        const url = await uploadFile(image.path);
        await helperFunction.deleteFileFromUploadFoler(image.filename);

        result = await this.candidateModel.updateOne(
          { id },
          {
            fullname,
            course,
            level,
            manifestoe,
            position,
            image: url,
          },
        );
      } else {
        result = await this.candidateModel.updateOne(
          { id },
          {
            fullname,
            course,
            level,
            manifestoe,
            position,
          },
        );
      }

      return new ResponseMessage(true, null, 'record updated successfully');
    } catch (e) {
      throw new InternalServerErrorException(e.message);
    }
  }

  async deleteCandidate(id: string): Promise<IResponseMessage> {
    try {
      await this.candidateModel.deleteOne({ id });

      return new ResponseMessage(true, null, 'record deleted successfully');
    } catch (e) {
      throw new InternalServerErrorException(e.message);
    }
  }
}
