import { Controller, Post } from '@nestjs/common';
import { Public } from 'src/common/decorators';
import { OtpService } from './otp.service';

@Controller('otp')
export class OtpController {
  constructor(private readonly otpService: OtpService) {}

  // @Post()
  // @Public()
  // async test() {
  //   return await this.otpService.createAndSendEmailValidationOtp(
  //     'josephchimezie2003@gmail.com',
  //   );
  // }
}
