import { useState } from "react";
import noteContext from "./noteConext";

const NoteState = (props)=>{
    const notesInitial = [
        {
          "_id": "65491db46d4dffb400ba67b4d0",
          "user": "65491d556d4fb400ba67b4cc",
          "title": "Notes",
          "description": "token recieved2dfsdf",
          "tag": "Regular",
          "date": "2023-11-06T17:09:08.546Z",
          "__v": 0
        },
        {
          "_id": "65491db66d4fb4gf00ba67b4d2",
          "user": "65491d556d4fb400ba67b4cc",
          "title": " Notes hello",
          "description": "token recieved2dfsdf",
          "tag": "Regular",
          "date": "2023-11-06T17:09:10.640Z",
          "__v": 0
        },
        {
          "_id": "65491db76d4fb40sd0ba67b4d4",
          "user": "65491d556d4fb400ba67b4cc",
          "title": " Notes yellow",
          "description": "token recieved2dfsdf",
          "tag": "Regular",
          "date": "2023-11-06T17:09:11.225Z",
          "__v": 0
        },
        {
          "_id": "65491db76d4fb400bagd67b4d4",
          "user": "65491d556d4fb400ba67b4cc",
          "title": " Notes yellow",
          "description": "token recieved2dfsdf",
          "tag": "Regular",
          "date": "2023-11-06T17:09:11.225Z",
          "__v": 0
        },
        {
          "_id": "65491db76d4fb400ba6sdf7b4d4",
          "user": "65491d556d4fb400ba67b4cc",
          "title": " Notes yellow",
          "description": "token recieved2dfsdf",
          "tag": "Regular",
          "date": "2023-11-06T17:09:11.225Z",
          "__v": 0
        },
        
      ]
      const [notes,setNotes] = useState(notesInitial)
    
    return(
        <noteContext.Provider value={{notes,setNotes}}>
            {props.children}
        </noteContext.Provider>
    )
}

export default NoteState