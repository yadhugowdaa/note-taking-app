import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { getNotes, createNote, deleteNote, updateNote } from '../services/api';
import styles from './WelcomePage.module.css';

interface Note {
  _id: string;
  title: string;
  content: string;
}

const WelcomePage = () => {
  const { user, token, logout } = useAuth();
  const navigate = useNavigate();

  const [notes, setNotes] = useState<Note[]>([]);
  const [newNoteTitle, setNewNoteTitle] = useState('');
  const [newNoteContent, setNewNoteContent] = useState('');
  const [error, setError] = useState('');
  const [expandedNote, setExpandedNote] = useState<string | null>(null);

  // Editing state
  const [editingNoteId, setEditingNoteId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editContent, setEditContent] = useState('');

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        if (!token) return;
        const userNotes = await getNotes(token);
        setNotes(userNotes);
      } catch (err) {
        setError('Failed to fetch notes.');
      }
    };
    if (token) {
      fetchNotes();
    }
  }, [token]);

  const handleCreateNote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token || !newNoteTitle || !newNoteContent) {
      return setError('Title and content are required.');
    }
    try {
      await createNote({ title: newNoteTitle, content: newNoteContent }, token);
      setNewNoteTitle('');
      setNewNoteContent('');
      const userNotes = await getNotes(token);
      setNotes(userNotes);
      setError('');
    } catch (err) {
      setError('Failed to create note.');
    }
  };

  const handleDeleteNote = async (noteId: string) => {
    try {
      if (!token) return;
      await deleteNote(noteId, token);
      const userNotes = await getNotes(token);
      setNotes(userNotes);
    } catch (err) {
      setError('Failed to delete note.');
    }
  };

  const handleStartEdit = (note: Note) => {
    setEditingNoteId(note._id);
    setEditTitle(note.title);
    setEditContent(note.content);
  };

  const handleCancelEdit = () => {
    setEditingNoteId(null);
    setEditTitle('');
    setEditContent('');
  };

  const handleSaveEdit = async (noteId: string) => {
    if (!token) return;
    try {
      await updateNote(noteId, { title: editTitle, content: editContent }, token);
      const userNotes = await getNotes(token);
      setNotes(userNotes);
      setEditingNoteId(null);
    } catch (err) {
      setError('Failed to update note.');
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/signup');
  };

  // auto-resize textarea
  const handleTextareaInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    e.target.style.height = 'auto';
    e.target.style.height = `${e.target.scrollHeight}px`;
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Note It</h1>
        {user ? (
          <div className={styles.userInfo}>
            <p>Welcome, <strong>{user.name}</strong></p>
            <button onClick={handleLogout} className={styles.logoutButton}>Log Out</button>
          </div>
        ) : (
          <p>You are not logged in. Please <a href="/signup">sign up</a>.</p>
        )}
      </header>

      <main className={styles.mainContent}>
        <section className={styles.createNoteSection}>
          <h2>Create a New Note</h2>
          <form onSubmit={handleCreateNote}>
            <input
              type="text"
              placeholder="Note Title"
              className={styles.formInput}
              value={newNoteTitle}
              onChange={(e) => setNewNoteTitle(e.target.value)}
            />
            <textarea
              placeholder="Note Content"
              className={styles.formTextarea}
              value={newNoteContent}
              onChange={(e) => setNewNoteContent(e.target.value)}
              onInput={handleTextareaInput}
              rows={1}
            />
            <button type="submit" className={styles.formButton}>Add Note</button>
          </form>
          {error && <p style={{ color: '#cf6679' }}>{error}</p>}
        </section>

        <section className={styles.notesSection}>
          <h2>Your Notes</h2>
          {notes.length > 0 ? (
            <div className={styles.notesGrid}>
              {notes.map((note) => {
                const isExpanded = expandedNote === note._id;
                const content = isExpanded ? note.content : note.content.slice(0, 200);

                return (
                  <div key={note._id} className={styles.note}>
                    {editingNoteId === note._id ? (
                      <div>
                        <input
                          type="text"
                          value={editTitle}
                          onChange={(e) => setEditTitle(e.target.value)}
                          className={styles.formInput}
                        />
                        <textarea
                          value={editContent}
                          onChange={(e) => setEditContent(e.target.value)}
                          onInput={handleTextareaInput}
                          className={styles.formTextarea}
                          rows={1}
                        />
                        <div className={styles.editActions}>
                          <button
                            className={styles.saveButton}
                            onClick={() => handleSaveEdit(note._id)}
                          >
                            Save
                          </button>
                          <button
                            className={styles.cancelButton}
                            onClick={handleCancelEdit}
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className={styles.noteHeader}>
                          <h3>{note.title}</h3>
                          <div>
                            <button
                              onClick={() => handleStartEdit(note)}
                              className={styles.editButton}
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDeleteNote(note._id)}
                              className={styles.deleteButton}
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                        <p className={styles.noteContent}>{content}</p>
                        {note.content.length > 200 && (
                          <button
                            className={styles.readMoreButton}
                            onClick={() =>
                              setExpandedNote(isExpanded ? null : note._id)
                            }
                          >
                            {isExpanded ? 'Show Less' : 'Read More'}
                          </button>
                        )}
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
            <p>You have no notes. Create one above!</p>
          )}
        </section>
      </main>
    </div>
  );
};

export default WelcomePage;
