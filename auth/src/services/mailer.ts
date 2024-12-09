import { autoInjectable, inject } from 'tsyringe';

@autoInjectable()
export default class MailerService {
  constructor(
    @inject('emailClient') private emailClient,
    @inject('emailDomain') private emailDomain,
  ) {
    // send mail
  }
  public async SendWelcomeEmail(email: string) {
    const data = {
      from: 'noreply@' + this.emailDomain,
      to: [email],
      subject: 'Welcome to Atla',
      text: 'Testing some Mailgun awesomness!',
    };
    this.emailClient;
  }
}
