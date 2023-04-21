import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { Environment } from 'src/common/configs/environment';
import { MailService } from './mail.service';

@Module({
  imports: [
    MailerModule.forRootAsync({
      useFactory: async () => ({
        transport: {
          host: Environment.SMTP.HOST,
          secure: false,
          auth: {
            user: Environment.SMTP.USER,
            pass: Environment.SMTP.PASSWORD,
          },
        },
        defaults: {
          from: Environment.SMTP.USER,
        },
      }),
    }),
  ],
  controllers: [],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
