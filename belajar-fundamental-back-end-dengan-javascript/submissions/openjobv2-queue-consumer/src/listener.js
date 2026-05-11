class Listener {
  constructor(emailService, mailSender) {
    this._emailService = emailService;
    this._mailSender = mailSender;

    this.listen = this.listen.bind(this);
  }

  async listen(message) {
    try {
      const { applicationId, jobId } = JSON.parse(message.content.toString());

      const emailMessage = await this._emailService.getEmailMessage(applicationId);
      console.log('message: ', emailMessage);
      const { email: emailReceiver } = await this._emailService.getEmailReceiver(jobId);
      console.log('receiver', emailReceiver);
      const result = await this._mailSender.sendEmail(emailReceiver, JSON.stringify(emailMessage));
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  }
}

export default Listener;
