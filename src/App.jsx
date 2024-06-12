import React, { useState } from 'react';
import './App.css'; // External stylesheet for styles

function App() {
  const [notes, setNotes] = useState([]);      //  initialized as an empty array
  const [currentNote, setCurrentNote] = useState('');   //  initialized as an empty string
  const [editIndex, setEditIndex] = useState(-1);   //  when editIndex is -1, it indicates that no note is currently being edited.
  const [showList, setShowList] = useState(false);   // false means list view is not shown
  const [selectedNoteIndex, setSelectedNoteIndex] = useState(-1);     // no note is selected 

  const addNote = () => {
    if (currentNote.trim() !== '') {  // if its not an empty string, user has entered some content for the note.
      if (editIndex === -1) {     // and if its not in an editing stage
        setNotes([...notes, currentNote]);    // then set note, It adds the new note to the end of the array
      } else {   // if its editing
        const updatedNotes = [...notes];   // update the note
        updatedNotes[editIndex] = currentNote;   // and make it a current one 
        setNotes(updatedNotes);    // now set it 
        setEditIndex(-1);    // now resets the app to the initial state ie -1
      }
      setCurrentNote('');  // empty string to add new notes 
    }
  };

  const deleteNote = (index) => { 
    const updatedNotes = [...notes];
    updatedNotes.splice(index, 1);  // This line removes one element from the updatedNotes array at the specified index
    setNotes(updatedNotes);
    setSelectedNoteIndex(-1);
  };

  const editNote = (index) => {
    setCurrentNote(notes[index]);    // update the index note to the current node 
    setEditIndex(index);
    setSelectedNoteIndex(-1);
  }

  const handleNoteClick = (index) => {
    if (selectedNoteIndex === index) {
      // If the clicked note is already selected, deselect it
      setSelectedNoteIndex(-1);
    } else {
      // Otherwise, select the clicked note
      setSelectedNoteIndex(index);
    }
  }

  const toggleView = () => {
    setShowList(!showList);
    setSelectedNoteIndex(-1);
  };

  return (
    <div className="App">
      <h1>Note-Taking App</h1>
      <div className="note-form">
        <textarea
          rows="4"
          cols="50"
          value={currentNote}
          onChange={(e) => setCurrentNote(e.target.value)}
          placeholder="Enter your note..."
        ></textarea>
        <br />
        <button onClick={addNote}>{editIndex === -1 ? 'Add Note' : 'Update Note'}</button>
      </div>
      <div>
        <button onClick={toggleView}>List View</button> {/* Button for toggling between views */}
      </div>
      {showList ? (
      <ul className="note-list">
      {notes.map((note, index) => (
        <li key={index} className={selectedNoteIndex === index ? 'note-item selected' : 'note-item'}>
          <span onClick={() => handleNoteClick(index)}>{note}</span>
          {selectedNoteIndex === index && (
            <div className="options">
              <button onClick={() => editNote(index)}>Edit</button>
              
              <button onClick={() => deleteNote(index)}>Delete</button>
            </div>
          )}
        </li>
      ))}
    </ul>
      ) : null}
    </div>
  );
}

export default App;
