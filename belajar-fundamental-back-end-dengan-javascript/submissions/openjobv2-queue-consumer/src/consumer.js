import 'dotenv/config';
import amqp from 'amqplib';
import EmailService from './EmailService.js';
import MailSender from './MailSender.js';
import Listener from './listener.js';

const init = async () => {
  const emailService = new EmailService();
  const mailSender = new MailSender();
  const listener = new Listener(emailService, mailSender);

  const connection = await amqp.connect({
    hostname: process.env.RABBITMQ_HOST,
    port: process.env.RABBITMQ_PORT,
    username: process.env.RABBITMQ_USER,
    password: process.env.RABBITMQ_PASSWORD
  });
  const channel = connection.createChannel();

  (await channel).assertQueue('user:application', {
    durable: true,
  });

  (await channel).consume('user:application', listener.listen, { noAck: true });
};

init();
