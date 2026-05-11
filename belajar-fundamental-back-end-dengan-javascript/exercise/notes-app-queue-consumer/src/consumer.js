import 'dotenv/config';
import amqp from 'amqplib';
import NotesService from './NotesService.js';
import MailSender from './MailSender.js';
import Listener from './listener.js';

const init = async () => {
  const notesService = new NotesService();
  const mailSender = new MailSender();
  const listener = new Listener(notesService, mailSender);

  const connection = await amqp.connect(process.env.RABBITMQ_SERVER);
  const channel = connection.createChannel();

  (await channel).assertQueue('export:notes', {
    durable: true,
  });

  (await channel).consume('export:notes', listener.listen, { noAck: true });
};

init();
