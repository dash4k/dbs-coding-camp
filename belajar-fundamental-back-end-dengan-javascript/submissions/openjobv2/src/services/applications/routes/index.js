import { Router } from 'express';
import {
  registerApplication,
  listApplications,
  viewApplicationDetails,
  listApplicationsFromUser,
  listApplicationsFromJob,
  editApplicationDetails,
  removeApplication
} from '../controllers/application-controller.js';
import authenticateToken from '../../../middlewares/auth.js';
import validate from '../../../middlewares/validate.js';
import {
  postApplicationPayloadSchema,
  putApplicationPayloadSchema
} from '../validator/schema.js';

const router = Router();

router.post('/applications', authenticateToken, validate(postApplicationPayloadSchema), registerApplication);
router.get('/applications', authenticateToken, listApplications);
router.get('/applications/:id', authenticateToken, viewApplicationDetails);
router.get('/applications/user/:userId', authenticateToken, listApplicationsFromUser);
router.get('/applications/job/:jobId', authenticateToken, listApplicationsFromJob);
router.put('/applications/:id', authenticateToken, validate(putApplicationPayloadSchema), editApplicationDetails);
router.delete('/applications/:id', authenticateToken, removeApplication);

export default router;
