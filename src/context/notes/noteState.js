import { useState } from "react";
import noteContext from "./noteConext";

const NoteState = (props) => {
  const host = "http://localhost:5500";
  const notesInitial = [];
  const [notes, setNotes] = useState(notesInitial);

  //Get all your notes
  const getNotes = async () => {
    // Api call
    const url = `${host}/api/notes/fetchAllNotes`;
    const response = await fetch(url, {
      method: "GET",
      headers: {  
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjU0OTFkNTU2ZDRmYjQwMGJhNjdiNGNjIn0sImlhdCI6MTY5OTI5MDQ1M30.vpLv3XlEMX26LzryDM9W3BTubHvgJ1mwTNP91qrt8Xk",
      },
    });
    const json = await response.json();

    setNotes(json);
  };

  //add a Note
  const addNote = async (title, description, tag) => {
    //TODO Api call
    const url = `${host}/api/notes/addnote`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjU0OTFkNTU2ZDRmYjQwMGJhNjdiNGNjIn0sImlhdCI6MTY5OTI5MDQ1M30.vpLv3XlEMX26LzryDM9W3BTubHvgJ1mwTNP91qrt8Xk",
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const note = await response.json()
    setNotes(notes.concat(note));
    
  };
  //delete a Note
  const deleteNote = async(id) => {
    //TODO Api call
    const url = `${host}/api/notes/deletenote/${id}`;
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjU0OTFkNTU2ZDRmYjQwMGJhNjdiNGNjIn0sImlhdCI6MTY5OTI5MDQ1M30.vpLv3XlEMX26LzryDM9W3BTubHvgJ1mwTNP91qrt8Xk",
      },
    });
    const json = response.json();
    const delNote = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(delNote);
  };
  //edit a Note
  const editNote = async (id, title, description, tag) => {
    //Api call
    const url = `${host}/api/notes/updatenote/${id}`;
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjU0OTFkNTU2ZDRmYjQwMGJhNjdiNGNjIn0sImlhdCI6MTY5OTI5MDQ1M30.vpLv3XlEMX26LzryDM9W3BTubHvgJ1mwTNP91qrt8Xk",
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const json = response.json();
    //Logic to edit note in client side
    let newNote = JSON.parse(JSON.stringify(notes))
    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];
      if (element._id === id) {
        newNote[index].title = title;
        newNote[index].description = description;
        newNote[index].tag = tag;
        break;
      }
    }
    setNotes(newNote)
  };

  return (
    <noteContext.Provider
      value={{ notes, addNote, deleteNote, editNote, getNotes }}
    >
      {props.children}
    </noteContext.Provider>
  );
};

export default NoteState;
