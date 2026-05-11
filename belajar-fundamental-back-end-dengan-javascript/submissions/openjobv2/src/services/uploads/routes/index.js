import { Router } from 'express';
import {
  uploadDocuments,
  listDocuments,
  viewDocumentDetails,
  removeDocument
} from '../controller/upload-controller.js';
import authenticateToken from '../../../middlewares/auth.js';
import { upload } from '../storage/storage-config.js';

const router = Router();

router.post('/documents', authenticateToken, upload.single('document'), uploadDocuments);
router.get('/documents', listDocuments);
router.get('/documents/:id', viewDocumentDetails);
router.delete('/documents/:id', authenticateToken, removeDocument);

export default router;
