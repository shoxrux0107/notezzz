import React, { useState } from "react";
import "./NoteTaker.css";

const NoteTaker = () => {
  const [newNote, setNewNote] = useState("");
  const [noteTitle, setNoteTitle] = useState("");
  const [notes, setNotes] = useState([]);
  const [theme, setTheme] = useState("light");
  const [editMode, setEditMode] = useState(null); // Track which note is being edited
  const [editedNote, setEditedNote] = useState({ title: "", content: "" });

  // Handle input changes for note title and content
  const handleInputChange = (e) => {
    if (e.target.name === "title") {
      setNoteTitle(e.target.value);
    } else {
      setNewNote(e.target.value);
    }
  };

  // Handle submit to add the note
  const handleSubmit = (e) => {
    e.preventDefault();
    if (newNote.trim() === "" || noteTitle.trim() === "") return;
    const newNoteObj = {
      id: Date.now(),
      title: noteTitle,
      content: newNote,
      isOpen: false,
      isEditable: false,
    };
    setNotes([...notes, newNoteObj]);
    setNewNote("");
    setNoteTitle("");
  };

  // Toggle note content visibility
  const toggleNote = (id) => {
    const updatedNotes = notes.map((note) =>
      note.id === id ? { ...note, isOpen: !note.isOpen } : note
    );
    setNotes(updatedNotes);
  };

  // Handle Delete
  const handleDelete = (id) => {
    const updatedNotes = notes.filter((note) => note.id !== id);
    setNotes(updatedNotes);
  };

  // Start editing a note
  const handleEdit = (id) => {
    const noteToEdit = notes.find((note) => note.id === id);
    setEditMode(id);
    setEditedNote({
      title: noteToEdit.title,
      content: noteToEdit.content,
    });
  };

  // Save edited note
  const handleSaveEdit = (id) => {
    const updatedNotes = notes.map((note) =>
      note.id === id
        ? {
            ...note,
            title: editedNote.title,
            content: editedNote.content,
          }
        : note
    );
    setNotes(updatedNotes);
    setEditMode(null);
    setEditedNote({ title: "", content: "" });
  };

  // Cancel edit
  const handleCancelEdit = () => {
    setEditMode(null);
    setEditedNote({ title: "", content: "" });
  };

  // Toggle between light and dark theme
  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <div className={`note-taker ${theme}`}>
      <button className="theme-toggle" onClick={toggleTheme}>
        Toggle Theme
      </button>

      <form onSubmit={handleSubmit} className="note-form">
        <input
          type="text"
          name="title"
          value={noteTitle}
          onChange={handleInputChange}
          placeholder="Enter note title"
          required
        />
        <textarea
          name="content"
          value={newNote}
          onChange={handleInputChange}
          placeholder="Enter note content"
          rows="4"
          cols="50"
          required
        />
        <button type="submit">Submit</button>
      </form>

      <div className="note-list">
        {notes.map((note) => (
          <div key={note.id} className="note-item">
            {editMode === note.id ? (
              <div>
                <input
                  type="text"
                  value={editedNote.title}
                  onChange={(e) =>
                    setEditedNote({
                      ...editedNote,
                      title: e.target.value,
                    })
                  }
                  placeholder="Edit note title"
                />
                <textarea
                  value={editedNote.content}
                  onChange={(e) =>
                    setEditedNote({
                      ...editedNote,
                      content: e.target.value,
                    })
                  }
                  placeholder="Edit note content"
                />
                <button onClick={() => handleSaveEdit(note.id)}>Save</button>
                <button onClick={handleCancelEdit}>Cancel</button>
              </div>
            ) : (
              <div>
                <div className="note-title" onClick={() => toggleNote(note.id)}>
                  <h3>{note.title}</h3>
                </div>
                {note.isOpen && <p>{note.content}</p>}
                <div className="note-buttons">
                  <button onClick={() => handleEdit(note.id)}>Edit</button>
                  <button onClick={() => handleDelete(note.id)}>Delete</button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default NoteTaker;
