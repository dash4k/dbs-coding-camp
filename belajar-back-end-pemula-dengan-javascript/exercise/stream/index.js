import fs from 'fs';

const readableStream = fs.createReadStream('input.txt', {
    highWaterMark: 15
});

const writableStream = fs.createWriteStream('output.txt');

readableStream.on('readable', () => {
    try {
        writableStream.write(`${readableStream.read()}\n`);
    } catch(error) {
        console.log('Error saat mencoba membaca data');
        console.warn(error.message);
    }
});

readableStream.on('end', () => {
    console.log('Selesai membaca file');
});