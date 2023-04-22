import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  IResponseMessage,
  ResponseMessage,
} from 'src/common/constants/response';
import { helperFunction } from 'src/common/helpers/helper';
import { MailService } from '../mail/mail.service';
import { User, UserDocument } from './schema/user.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private mailService: MailService,
  ) {}

  async findByEmail(email: string): Promise<UserDocument> {
    return await this.userModel.findOne({ email });
  }

  async findByMatricNo(matricNo: string): Promise<UserDocument> {
    return await this.userModel.findOne({ matricNo });
  }

  async findById(id: string): Promise<UserDocument> {
    return await this.userModel.findOne({ id });
  }

  async findByLoginPassword(password: string): Promise<UserDocument> {
    try {
      return await this.userModel.findOne({ loginPassword: password });
    } catch (err) {
      throw new InternalServerErrorException(err.message);
    }
  }

  async generateLoginPassword(id: string): Promise<void> {
    try {
      const user = await this.findById(id);
      if (!user) {
        throw new NotFoundException('No user found with provided id');
      }

      const loginPassword = helperFunction.generateRandomString(48);
      const date = new Date();
      const expiresIn = new Date(date.getTime() + 5 * 60000);

      await this.userModel.updateOne(
        { id },
        { loginPassword, loginPasswordExpiresIn: expiresIn },
      );

      this.mailService.sendMail(
        user.email,
        'One Time Login Password',
        `Here is your one time login password: <b>${loginPassword}</b>`,
      );
    } catch (err) {
      throw new InternalServerErrorException(err.message);
    }
  }

  async deleteUserLoginPassword(id: string): Promise<void> {
    try {
      await this.userModel.updateOne(
        { id },
        {
          loginPassword: '',
        },
      );
    } catch (err) {
      throw new InternalServerErrorException(err.message);
    }
  }

  async findByEmailAndMatricNo(
    email: string,
    matricNo: string,
  ): Promise<UserDocument> {
    try {
      const user = await this.userModel.findOne({ email, matricNo });
      return user;
    } catch (err) {
      throw new InternalServerErrorException(err.message);
    }
  }

  async createUser(payload: any): Promise<UserDocument> {
    return await this.userModel.create(payload);
  }

  async getProfile(id: string): Promise<IResponseMessage> {
    try {
      const user = await this.findById(id);

      return new ResponseMessage(true, user);
    } catch (e) {
      throw new InternalServerErrorException(e.message);
    }
  }

  async getAllUsers(): Promise<IResponseMessage> {
    try {
      const users = await this.userModel.find();

      return new ResponseMessage(true, users, 'record fetched successfully');
    } catch (e) {
      throw new InternalServerErrorException(e.message);
    }
  }
}
