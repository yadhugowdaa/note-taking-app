import { Response } from 'express';
import Note from '../models/Note';
import { AuthRequest } from '../middleware/authMiddleware'; // Import the custom request type

// @desc    Get user's notes
// @route   GET /api/notes
// @access  Private
export const getNotes = async (req: AuthRequest, res: Response) => {
  try {
    // We can now safely use req.user because AuthRequest defines it
    const notes = await Note.find({ user: req.user?.id });
    res.json(notes);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Create a new note
// @route   POST /api/notes
// @access  Private
export const createNote = async (req: AuthRequest, res: Response) => {
  try {
    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({ message: 'Please add a title and content' });
    }

    const note = new Note({
      title,
      content,
      user: req.user?.id,
    });

    const createdNote = await note.save();
    res.status(201).json(createdNote);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Delete a note
// @route   DELETE /api/notes/:id
// @access  Private
export const deleteNote = async (req: AuthRequest, res: Response) => {
  try {
    const note = await Note.findById(req.params.id);

    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }

    if (note.user.toString() !== req.user?.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    await Note.deleteOne({ _id: req.params.id });

    res.json({ message: 'Note removed' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};