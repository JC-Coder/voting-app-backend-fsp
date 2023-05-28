import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { Environment } from 'src/common/configs/environment';
import { JwtStrategy } from './strategies/jwt.strategy';
import { OtpModule } from '../otp/otp.module';

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      secret: Environment.JWT.SECRET,
      signOptions: { expiresIn: `40d` },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
