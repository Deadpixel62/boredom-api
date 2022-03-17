import React from 'react'
import {useEffect, useState } from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {storageFav, removeFav, setFavTypes} from '../actions'


function Favorites() {
    const favActivities = useSelector((state) => state.favoriteActivities);
    const favTypes = useSelector((state) => state.favTypes);
    const [filteredFav, setFilteredFav] = useState(favActivities)
    const dispatch = useDispatch();
    const [searchValue, setSearchValue] = useState("");
    const [filteredType, setFilteredType] = useState("");



    useEffect(() =>{
        const favs = localStorage.getItem('favorites-list');
        const types = localStorage.getItem('favorite-types');
        if(favs) {
          dispatch(storageFav(JSON.parse(favs)))
        };
        if(types) {
            dispatch(setFavTypes(JSON.parse(types)));
        }
          }, [])
        
          useEffect(()=>{
            localStorage.setItem('favorites-list', JSON.stringify(favActivities));
            localStorage.setItem('favorite-types', JSON.stringify(favTypes));
          })

    useEffect(() => {
        let mounted = true;
        if(mounted){
          setFilteredFav(favActivities);

        }
        return() => {
          mounted = false
        }
      } ,[favActivities]);





  return (
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
{favTypes.map((item) => {
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
    
  )
}

export default Favorites