import { Router } from 'express';
import authenticateToken from '../../../middlewares/auth.js';
import validate from '../../../middlewares/validate.js';
import {
  listCompanies,
  viewCompanyDetail,
  registerCompany,
  editCompanyDetail,
  removeCompany
} from '../controllers/company-controller.js';
import {
  postCompanyPayloadSchema,
  putCompanyPayloadSchema,
} from '../validator/schema.js';

const router = Router();

router.get('/companies', listCompanies);
router.get('/companies/:id', viewCompanyDetail);
router.post('/companies', authenticateToken, validate(postCompanyPayloadSchema), registerCompany);
router.put('/companies/:id', authenticateToken, validate(putCompanyPayloadSchema), editCompanyDetail);
router.delete('/companies/:id', authenticateToken, removeCompany);

export default router;
