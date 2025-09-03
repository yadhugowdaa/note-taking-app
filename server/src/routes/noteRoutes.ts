import express from 'express';
import { getNotes, createNote, deleteNote } from '../controllers/notesController';
import { protect } from '../middleware/authMiddleware'; // Import our middleware

const router = express.Router();

// Apply the 'protect' middleware to all routes in this file
router.route('/').get(protect, getNotes).post(protect, createNote);
router.route('/:id').delete(protect, deleteNote);

export default router;