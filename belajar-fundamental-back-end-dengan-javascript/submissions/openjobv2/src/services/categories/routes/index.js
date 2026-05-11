import { Router } from 'express';
import authenticateToken from '../../../middlewares/auth.js';
import {
  listCategories,
  viewCategoryDetail,
  registerCategory,
  editCategoryDetail,
  removeCategory
} from '../controllers/category-controller.js';
import validate from '../../../middlewares/validate.js';
import {
  postCategoryPayloadSchema,
  putCategoryPayloadSchema
} from '../validator/schema.js';

const router = Router();

router.get('/categories', listCategories);
router.get('/categories/:id', viewCategoryDetail);
router.post('/categories', authenticateToken, validate(postCategoryPayloadSchema), registerCategory);
router.put('/categories/:id', authenticateToken, validate(putCategoryPayloadSchema), editCategoryDetail);
router.delete('/categories/:id', authenticateToken, removeCategory);

export default router;
