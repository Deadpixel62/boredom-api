import './App.css'
import Home from './Components/Home'
import Favorites from './Components/Favorites'
import { Routes, Route, Link } from "react-router-dom";


function App(){

  return(
<div>
<Link to="/">Home / </Link>
<Link to="/favorites">Favorites</Link>


<Routes>
<Route path='/' element={<Home/>} />
<Route path="/favorites" element={<Favorites/>} />
</Routes>
</div>
  )
}

export default App
