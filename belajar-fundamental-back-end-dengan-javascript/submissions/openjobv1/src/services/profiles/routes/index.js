import { Router } from 'express';
import authenticateToken from '../../../middlewares/auth.js';
import {
  viewUserProfile,
  viewUserApplications,
  viewUserBookmarks
} from '../controllers/profile-controller.js';

const router = Router();

router.get('/profile', authenticateToken, viewUserProfile);
router.get('/profile/applications', authenticateToken, viewUserApplications);
router.get('/profile/bookmarks', authenticateToken, viewUserBookmarks);

export default router;
