import { Module } from '@nestjs/common';
import { OtpService } from './otp.service';
import { OtpController } from './otp.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Otp, OtpSchema } from './schema/otp.schema';
import { MailModule } from '../mail/mail.module';

@Module({
  imports:[
    MailModule,
    MongooseModule.forFeature([{name: Otp.name, schema: OtpSchema}])
  ],
  controllers: [OtpController],
  providers: [OtpService],
  exports: [OtpService]
})
export class OtpModule {}
