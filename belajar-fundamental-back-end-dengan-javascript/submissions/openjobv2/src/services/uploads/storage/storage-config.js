import fs from 'fs';
import path from 'path';
import multer from 'multer';
import ClientError from '../../../exceptions/client-error.js';

export const UPLOAD_FOLDER = path.resolve('src/services/uploads/files/documents');

if (!fs.existsSync(UPLOAD_FOLDER)) {
  fs.mkdirSync(UPLOAD_FOLDER, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, UPLOAD_FOLDER),
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

export const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype && file.mimetype === 'application/pdf') cb(null, true);
    else cb(new ClientError('File is required'), false);
  }
});

export const deleteFromDisk = async (filePath) => {
  try {
    await fs.promises.unlink(filePath);
  } catch (error) {
    console.log('Error while trying to delete the document: ', error);
  }
};

export default { UPLOAD_FOLDER, storage, upload };
