import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import * as smtpTransport from 'nodemailer-smtp-transport';
import Mail from 'nodemailer/lib/mailer';

import {
  IMailConfig,
  IMailOptions,
  IMailResponse,
} from '@core/interfaces/mailer';

@Injectable()
export class MailerService {
  constructor(private readonly configService: ConfigService) {}

  async sendMail(options: IMailOptions) {
    return new Promise<IMailResponse>(
      async (
        resolve: (value?: IMailResponse) => void,
        rejects: (reaseon?: IMailResponse) => void,
      ): Promise<void> => {
        const mailConfig: IMailConfig = {
          fromEmail: this.configService.get<string>('mailer.fromEmail'),
          host: this.configService.get<string>('mailer.host'),
          port: this.configService.get<number>('mailer.port'),
          auth: {
            user: this.configService.get<string>('mailer.username'),
            pass: this.configService.get<string>('mailer.password'),
          },
        };

        const server: Mail = await this.getEmailServer(mailConfig);

        const mailOptions: Mail.Options = {
          from: mailConfig.fromEmail,
          to: options.to,
          subject: options.subject,
        };

        if (options.body) {
          mailOptions.text = options.body;
        }

        if (options.htmlBody) {
          mailOptions.html = options.htmlBody;
        }

        server.sendMail(
          mailOptions,
          (err: Error, info: nodemailer.SentMessageInfo) => {
            if (info) {
              resolve({ success: true, item: info });
            } else {
              rejects({
                success: false,
                errors: err,
              });
              Logger.log(`❌ - Error occured on nodemailer: ${err}`, 'Error');
            }
          },
        );
      },
    );
  }

  private async getEmailServer(mailConfig: IMailConfig): Promise<Mail> {
    return nodemailer.createTransport(
      smtpTransport({
        secure: true,
        ...mailConfig,
      }),
    );
  }
}
