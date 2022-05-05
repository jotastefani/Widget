
import nodemailer from 'nodemailer';
import { MailAdapter, SendMailData } from "../mail-adapter";

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "dd2575abccc535",
    pass: "a71159e39068b0"
  }
});

export class NodemailerMailAdapter implements MailAdapter {
  async sendMail({ subject, body }: SendMailData) {
      await transport.sendMail({
    from: 'Equipe Feedget <oi@feedget.com',
    to: 'Jeferson Stefani <jota.stefani@hotmail.com>',
    subject,
    html: body,
  });
  };
}