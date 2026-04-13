import { EventEmitter } from 'events';

const birthdayEventListener = (name) => {
    console.log(`Happy birthday ${name}`);
}

const myEmitter = new EventEmitter();

myEmitter.on('birthday-event', birthdayEventListener);

myEmitter.emit('birthday-event', "Budiman");