import { Router } from 'express';
import authenticateToken from '../../../middlewares/auth.js';
import {
  addBookmark,
  viewBookmarkDetails,
  removeBookmark,
  listBookmarks
} from '../controllers/bookmark-controller.js';

const router = Router();

router.post('/jobs/:jobId/bookmark', authenticateToken, addBookmark);
router.get('/jobs/:jobId/bookmark/:id', authenticateToken, viewBookmarkDetails);
router.delete('/jobs/:jobId/bookmark', authenticateToken, removeBookmark);
router.get('/bookmarks', authenticateToken, listBookmarks);

export default router;
