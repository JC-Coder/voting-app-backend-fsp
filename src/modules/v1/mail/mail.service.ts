import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { Environment } from 'src/common/configs/environment';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendMail(email: string, subject: string, content: string) {
    return await this.mailerService.sendMail({
      to: email,
      from: Environment.SMTP.USER,
      subject: subject,
      html: content,
    });
  }
}
