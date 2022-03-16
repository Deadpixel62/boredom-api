import { useEffect, useState } from 'react'
import logo from './logo.svg'
import './App.css'
import axios from 'axios'
import {useSelector, useDispatch} from 'react-redux'
import {storageFav, setRandomActivity, setTypeActivity, setPriceActivity, setFavoriteActivities, removeFav} from './actions'

function App() {
  const randomActivity = useSelector((state) => state.randomActivity);
  const typeActivity = useSelector((state) => state.typeActivity);
  const priceActivity = useSelector((state) => state.priceActivity);
  const favActivities = useSelector((state) => state.favoriteActivities);
  const [filteredFav, setFilteredFav] = useState(favActivities)
  const dispatch = useDispatch();
  const [type, setType] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [filteredType, setFilteredType] = useState("");
  const [typeField, setTypeField] = useState([]);
  const [count, setCount] = useState(0);


  useEffect(() =>{
const favs = localStorage.getItem('favorites-list');
if(favs) {
  dispatch(storageFav(JSON.parse(favs)))
}
  }, [])

  useEffect(()=>{
    localStorage.setItem('favorites-list', JSON.stringify(favActivities))
  })

  useEffect(() => {
    let mounted = true;

    if(mounted){
      axios.get('http://www.boredapi.com/api/activity/')
      .then((res) => dispatch(setRandomActivity(res.data)))
    }
    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    let mounted = true;
    if(mounted){
      setFilteredFav(favActivities)
    }
    return() => {
      mounted = false
    }
  } ,[favActivities]);

  useEffect(() => {
    let mounted = true;
    if(mounted) {
      favActivities.map((item) => {
        if(!typeField.includes(item.type)){
          setTypeField([...typeField, item.type])
        } else {
          console.log("type already exists.")
        }
      })
    }
  }, [favActivities])


  const generateActivity = () => {
    axios.get('http://www.boredapi.com/api/activity/')
    .then((res) => dispatch(setRandomActivity(res.data)))
  }

  const generateByType = () => {
    axios.get(`http://www.boredapi.com/api/activity/?type=${type}`)
    .then((res) => dispatch(setTypeActivity(res.data)));
    setType("")
  }

  const generateByPrice = () => {
    axios.get(`https://www.boredapi.com/api/activity?minprice=${minPrice}&maxprice=${maxPrice}`)
    .then((res) => dispatch(setPriceActivity(res.data)));
    
  }


  return (
    <div className="App">
    <button onClick={() => setCount(count + 1)}>{count}</button>
    <div>
    <h1>{randomActivity.activity}</h1>
    
    <button onClick={()=>generateActivity()}>Generate new activity</button>
    </div>

    <div>
    <h2>Select an activity by type</h2>

<label htmlFor="types">Choose a type:</label>

<select onChange={(e)=> setType(e.target.value)} id="types">
  <option value="charity">charity</option>
  <option value="recreational">recreational</option>
  <option value="education">education</option>
  <option value="social" >social</option>
  <option value="music" >music</option>
  <option value="relaxation" >relaxation</option>
</select>

<button onClick={() => generateByType()}>Generate activity</button>
<h1>activity: {typeActivity.activity} <br/> 
type: {typeActivity.type}</h1>
{typeActivity.activity && (
<button onClick={()=>{!favActivities.includes(typeActivity) ? dispatch(setFavoriteActivities(typeActivity)) : alert("Activity already in favorites!")}}>add to favorites</button>
)}
</div>

    <div>
    <h2>Generate an activity by price range:</h2>
<label htmlFor="minPrice">Choose min price:</label>

    <select onChange={(e) => setMinPrice(e.target.value)} id="minPrice">
    <option>0</option>
    <option>0.1</option>
    <option>0.2</option>
    <option>0.3</option>
    <option>0.4</option>
    <option>0.5</option>
    </select>

    <label htmlFor="maxPrice">Choose max price:</label>
    <select onChange={(e) => setMaxPrice(e.target.value)} id="prices">
    <option>0.1</option>
    <option>0.2</option>
    <option>0.3</option>
    <option>0.4</option>
    <option>0.5</option>
    <option>0.6</option>
    </select>

    <button onClick={() => generateByPrice()}>Generate activity</button>

    <h1>activity: {priceActivity.activity} <br/> price: {priceActivity.price}</h1>
{priceActivity.activity && (
<button onClick={()=>{!favActivities.includes(priceActivity) ? dispatch(setFavoriteActivities(priceActivity)) : alert("Activity already in favorites!")}}>add to favorites</button>
)}
    </div>

    <div>
    <h2>Favorite Activities:</h2>
    <form onSubmit={(e) => {
      e.preventDefault();
      if(searchValue.trim(" ").length=== 0){
       setFilteredFav(favActivities)
      } else {
      setFilteredFav(favActivities.filter((item) => {
        console.log(item)
        return item.activity.toLowerCase().includes(searchValue)
      }))
    }
    }}>
    <input value={searchValue} title="Type an activity name" placeholder='Search by activity name'  onChange={(e)=>setSearchValue(e.target.value)} type="text"/>
    <input value="search" type="submit"/>
    
    </form>

    
    
    
<form id="typeForm" onSubmit={(e) => {
  e.preventDefault();
  setFilteredFav(favActivities);
  setFilteredFav(favActivities.filter((item) => {
    return item.type.toLowerCase().includes(filteredType)
  }))
}}>
Filter by type
<select form="typeForm" onChange={(e)=> setFilteredType(e.target.value)} id="types">
<option value="Choose type">- Choose type -</option>
{typeField.map((item) => {
  return(
    <option key={Math.floor(Math.random() * 100)} value={item}>{item}</option>
  )
})}
</select>
    <input value="Filter" type="submit"/>
</form>
<button onClick={() => setFilteredFav(favActivities)}>Reset filter</button>

    {favActivities[0] ? (
    <ul>
    
    {filteredFav.map((item) => {
      return (
        <li key={item.key}>{item.activity} <button onClick={() => dispatch(removeFav(item))}>Remove from favorites</button></li>
      )
    })}
    </ul>
    ) 
    : "Add activities to your favorites."
  }
    </div>
      
    </div>
  )
}

export default App
