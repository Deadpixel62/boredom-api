import { useEffect, useState } from 'react'
import axios from 'axios'
import {useSelector, useDispatch} from 'react-redux'
import {storageFav, setRandomActivity, setTypeActivity, setPriceActivity, setFavoriteActivities, setFavTypes} from '../actions'

function Home() {
  const randomActivity = useSelector((state) => state.randomActivity);
  const typeActivity = useSelector((state) => state.typeActivity);
  const priceActivity = useSelector((state) => state.priceActivity);
  const favActivities = useSelector((state) => state.favoriteActivities);
  const dispatch = useDispatch();
  const [type, setType] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const favTypes = useSelector((state) => state.favTypes);



 
  useEffect(() =>{
    const favs = localStorage.getItem('favorites-list');
    const types = localStorage.getItem('favorite-types');
    if(favs) {
      dispatch(storageFav(JSON.parse(favs)))
    };
    if(types) {
        dispatch(setFavTypes(JSON.parse(types)))
    }
      }, [])
    
      useEffect(()=>{
        localStorage.setItem('favorites-list', JSON.stringify(favActivities));
        localStorage.setItem('favorite-types', JSON.stringify(favTypes));
      })

  useEffect(() => {
    let mounted = true;

    if(mounted){
      axios.get('https://www.boredapi.com/api/activity/')
      .then((res) => dispatch(setRandomActivity(res.data)))
    }
    return () => {
      mounted = false;
    };
  }, []);

 




  const generateActivity = () => {
    axios.get('https://www.boredapi.com/api/activity/')
    .then((res) => dispatch(setRandomActivity(res.data)))
  }

  const generateByType = () => {
    axios.get(`https://www.boredapi.com/api/activity/?type=${type}`)
    .then((res) => dispatch(setTypeActivity(res.data)));
    
  }

  const generateByPrice = () => {
    axios.get(`https://www.boredapi.com/api/activity?minprice=${minPrice}&maxprice=${maxPrice}`)
    .then((res) => dispatch(setPriceActivity(res.data)));
    
  }


  return (
    <div className="App">
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

    
      
    </div>
  )
}

export default Home
