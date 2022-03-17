import React from 'react'
import {useEffect, useState } from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {storageFav, removeFav, setFavTypes} from '../actions'
import {Button, Select, Input} from 'antd'


function Favorites() {
    const favActivities = useSelector((state) => state.favoriteActivities);
    const favTypes = useSelector((state) => state.favTypes);
    const [filteredFav, setFilteredFav] = useState(favActivities)
    const dispatch = useDispatch();
    const [searchValue, setSearchValue] = useState("");
    const [filteredType, setFilteredType] = useState("");
    const {Option} = Select;



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
          return item.activity.toLowerCase().includes(searchValue.toLowerCase())
        }))
      }
      }}>
    <Input allowClear style={{ width: 200 }} value={searchValue} title="Type an activity name" placeholder='Search by activity name'  onChange={(e)=>setSearchValue(e.target.value)} type="text"/>
    <Input value="search" style={{ width: 130 }} type="submit"/>
    
    </form>

    
    
    
<form id="typeForm" onSubmit={(e) => {
  e.preventDefault();
  setFilteredFav(favActivities);
  setFilteredFav(favActivities.filter((item) => {
    return item.type.toLowerCase().includes(filteredType)
  }))
}}>
Filter by type
<Select style={{width:140}} onSelect={(e) => console.log(e)} form="typeForm" onChange={(value)=>setFilteredType(value)} id="types">

{favTypes.map((item) => {
    return(
      <Option key={Math.floor(Math.random() * 100)} value={item}> {item} </Option>
    )
  })}
</Select>
    <Input style={{width:60}} value="Filter" type="submit"/><Button onClick={() => setFilteredFav(favActivities)}>Reset filter</Button>
</form>


    {favActivities[0] ? (
    <ul>
    
    {filteredFav.map((item) => {
      return (
        <li key={item.key}>{item.activity} <Button onClick={() => dispatch(removeFav(item))}>Remove from favorites</Button></li>
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