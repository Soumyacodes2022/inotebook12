import React , {useContext , useState} from 'react'
import noteContext from "../context/notes/noteConext";

const AddNote = () => {
    const context = useContext(noteContext)
    const {addNote} = context
    const [note,setNote] = useState({title:"", description :"", tag:""})
    const handleOnClick = (e)=> {
        e.preventDefault();
        addNote(note.title, note.description, note.tag)
        setNote({title:"", description :"", tag:""})
    }
    const onchange =(e)=>{
        setNote({...note, [e.target.name]: e.target.value})
    }
  return (
    <div className="container my-3">
      <h2>Add a Note</h2>
      <form className="my-3">
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            name='title'
            aria-describedby="emailHelp"
            value={note.title}
            onChange={onchange}
            minLength={3}
            required
          />
        </div> 
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <input
            type="text"
            className="form-control"
            id="description"
            name='description'
            value={note.description}
            onChange={onchange}
            minLength={5}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="tag" className="form-label">
            Tag
          </label>
          <input
            type="text"
            className="form-control"
            id="tag"
            name='tag'
            value={note.tag}
            onChange={onchange}
            minLength={3}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary" onClick={handleOnClick} disabled = {note.title.length<3 || note.description.length<3 }>
          Add your Note
        </button>
      </form>
      
      
    </div>
  )
}

export default AddNote
