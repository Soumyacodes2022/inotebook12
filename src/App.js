import "./App.css";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Home from "./Components/Home";
import About from "./Components/About";
import NoteState from "./context/notes/noteState";
import Alert from "./Components/Alert";

function App() {
  return (
    <>
      <NoteState>
        <Router>
          <Navbar />
          <Alert message={"Hey there"}/>
          <div className="container">
          <Routes>
            <Route exact path="/" index element={<Home />} />
            <Route exact path="/about" index element={<About />} />
          </Routes>
          </div>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
