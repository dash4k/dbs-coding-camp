import fs from 'fs';
import path from 'path';

const fileReadCallback = (error, data) => {
    if (error) {
        console.log('Gagal membaca berkas');
        return;
    }
    console.log(data);
}

const filePath = path.resolve('package.json');
console.log(filePath);

fs.readFile(filePath, 'utf-8', fileReadCallback);