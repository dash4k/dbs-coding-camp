import express from 'express';
import {
  createNote,
  deleteNoteById,
  editNoteById,
  getNotes,
  getNoteById,
} from '../controller/note-controller.js';
import validate from '../../../middlewares/validate.js';
import validateQuery from '../../../middlewares/validateQuery.js';
import { notePayloadSchema, noteQuerySchema } from '../validator/schema.js';
import authenticateToken from '../../../middlewares/auth.js';

const router = express.Router();

router.post('/notes', authenticateToken, validate(notePayloadSchema), createNote);
router.get('/notes', authenticateToken, validateQuery(noteQuerySchema), getNotes);
router.get('/notes/:id', authenticateToken, getNoteById);
router.put('/notes/:id', authenticateToken, validate(notePayloadSchema), editNoteById);
router.delete('/notes/:id', authenticateToken, deleteNoteById);

export default router;