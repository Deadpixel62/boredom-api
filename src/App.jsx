import './App.css'
import Home from './Components/Home'
import Favorites from './Components/Favorites'
import { Routes, Route, Link } from "react-router-dom";
import '../node_modules/antd/dist/antd.css';
import { Badge } from 'antd';
import {useSelector} from 'react-redux'


function App(){
  const favCounter = useSelector((state) => state.favoriteActivities.length)

  return(
<div>
<Link to="/">Home / </Link>
<Badge count={favCounter }>
<Link to="/favorites">Favorites</Link>
</Badge>
<Routes>
<Route path='/' element={<Home/>} />
<Route path="/favorites" element={<Favorites/>} />
</Routes>
</div>
  )
}

export default App
