import { Router } from 'express';
import authenticateToken from '../../../middlewares/auth.js';
import {
  listJobs,
  viewJobDetail,
  listJobsFromCompany,
  listJobsFromCategory,
  registerJob,
  editJobDetail,
  removeJob
} from '../controllers/job-controller.js';
import validate from '../../../middlewares/validate.js';
import validateQuery from '../../../middlewares/validateQuery.js';
import {
  postJobPayloadSchema,
  putJobPayloadSchema,
  jobQuerySchema
} from '../validator/schema.js';

const router = Router();

router.get('/jobs', validateQuery(jobQuerySchema), listJobs);
router.get('/jobs/:id', viewJobDetail);
router.get('/jobs/company/:companyId', listJobsFromCompany);
router.get('/jobs/category/:categoryId', listJobsFromCategory);
router.post('/jobs', authenticateToken, validate(postJobPayloadSchema), registerJob);
router.put('/jobs/:id', authenticateToken, validate(putJobPayloadSchema), editJobDetail);
router.delete('/jobs/:id', authenticateToken, removeJob);

export default router;
