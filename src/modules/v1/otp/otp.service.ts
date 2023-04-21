import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { helperFunction } from 'src/common/helpers/helper';
import { MailService } from '../mail/mail.service';
import { CreateOtpDto } from './dtos/create-otp.dto';
import { Otp, OtpDocument } from './schema/otp.schema';

@Injectable()
export class OtpService {
  constructor(
    @InjectModel(Otp.name) private otpModel: Model<OtpDocument>,
    private mailService: MailService,
  ) {}

  async findOneByEmail(email: string): Promise<Otp> {
    return await this.otpModel.findOne({ email });
  }

  async findByEmailAndOtp(email: string, otp: string): Promise<Otp> {
    return await this.otpModel.findOne({ otp, email }); 
  }

  async createOtp(payload: CreateOtpDto): Promise<Otp> {
    const date = new Date();
    const expiresIn = new Date(date.setMinutes(date.getMinutes() + 5));

    const otpExistForEmail = await this.findOneByEmail(payload.email);

    if (otpExistForEmail) {
      await this.otpModel.deleteOne({ email: otpExistForEmail.email });
    }

    const otp = await this.otpModel.create({ ...payload, expiresIn });

    return otp;
  }

  // async createAndSendEmailValidationOtp(email: string) {
  //   const otp = helperFunction.generateRandomNumber(6);

  //   const result = await this.createOtp({ otp, email });

  //   await this.mailService.sendEmailVerificationOtp(email, otp);

  //   return { message: 'success' };
  // }
}
