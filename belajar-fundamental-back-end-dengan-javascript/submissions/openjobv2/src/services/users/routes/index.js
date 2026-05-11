import { Router } from 'express';
import { register, getUserProfile } from '../controllers/user-controller.js';
import validate from '../../../middlewares/validate.js';
import { userPayloadSchema } from '../validator/schema.js';

const router = Router();

router.post('/users', validate(userPayloadSchema), register);
router.get('/users/:id', getUserProfile);

export default router;