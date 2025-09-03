import mongoose, { Document, Schema } from 'mongoose';

// Interface to define the properties of a Note document
export interface INote extends Document {
  user: mongoose.Schema.Types.ObjectId; // A reference to the User who owns the note
  title: string;
  content: string;
  createdAt: Date;
}

const NoteSchema: Schema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId, // This is how we link a note to a specific user
    ref: 'User', // This tells Mongoose that the ID stored here refers to a document in the 'User' collection
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Create and export the Note model
export default mongoose.model<INote>('Note', NoteSchema);