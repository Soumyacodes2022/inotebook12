
import './App.css';
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import About from './Components/About';

function App() {
  return (
    <>
    <Router>
    <Navbar/>
      <Routes>
        <Route exact path="/" index element ={<Home/>}/>
        
        <Route exact path="/about" index element ={<About/>}/>
      </Routes>
    </Router>
    </>
  )
}

export default App;
