import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Environment } from './common/configs/environment';
import { AuthModule } from './modules/v1/auth/auth.module';
import { UserModule } from './modules/v1/user/user.module';
import { MulterModule } from '@nestjs/platform-express';
import { OtpModule } from './modules/v1/otp/otp.module';
import { CandidateModule } from './modules/v1/candidate/candidate.module';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: async () => ({
        uri: Environment.DB.URL,
        keepAlive: true,
      }),
    }),
    MulterModule.register({
      dest: './uploads',
    }),
    UserModule,
    AuthModule,
    OtpModule,
    CandidateModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
