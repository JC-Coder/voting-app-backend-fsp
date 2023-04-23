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
import { UserService } from '../user/user.service';

@Injectable()
export class CandidateService {
  constructor(
    @InjectModel(Candidate.name)
    private candidateModel: Model<CandidateDocument>,
    private userService: UserService,
  ) {}

  async getCandidates(role: string): Promise<IResponseMessage> {
    try {
      let candidates: any;
      console.log(role);

      if (role === 'user') {
        candidates = await this.candidateModel.find().sort({ votes: -1 });
      } else {
        candidates = await this.candidateModel.find();
      }

      return new ResponseMessage(
        true,
        candidates,
        'record fetched successfully',
      );
    } catch (e) {
      throw new InternalServerErrorException(e.message);
    }
  }

  async getCandidateByPosition(position: string): Promise<IResponseMessage> {
    try {
      const candidates = await this.candidateModel.find({
        position,
      });

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

  async voteCandidate(
    candidateId: string,
    userId: string,
  ): Promise<IResponseMessage> {
    try {
      const candidate = await this.candidateModel.findOne({ _id: candidateId });

      if (!candidate) {
        return new ResponseMessage(false, null, 'invalid candidate id');
      }

      const user = await this.userService.findById(userId);

      const voted = user.votedPositions.includes(candidate.position);

      if (voted) {
        return new ResponseMessage(
          false,
          null,
          'user already voted for a candidate in this category',
        );
      }

      candidate.votes += 1;
      await candidate.save();
      await this.userService.updateUserVotes(userId, candidate.position);

      return new ResponseMessage(true, null, 'record updated successfully');
    } catch (e) {
      throw new InternalServerErrorException(e.message);
    }
  }

  async getTopCandidates(): Promise<IResponseMessage> {
    try {
      const candidates = await this.candidateModel.find();

      const highestScoringCandidates = [];
      const positions = [...new Set(candidates.map((c) => c.position))];

      positions.forEach((position) => {
        highestScoringCandidates.push(
          candidates
            .filter((c) => c.position === position)
            .sort((a, b) => b.votes - a.votes)[0],
        );
      });

      return new ResponseMessage(
        true,
        highestScoringCandidates,
        'record fetched successfully',
      );
    } catch (e) {
      throw new InternalServerErrorException(e.message);
    }
  }
}
