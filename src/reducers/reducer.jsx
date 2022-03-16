const initialState = {
    randomActivity: {},
    typeActivity:{},
    priceActivity:{},
    favoriteActivities:[],
}

const Reducer = (state = initialState, action) => {
    switch(action.type){
        case "incrementCounter":
            console.log(action)
            return {...state, count: state.count + 1}

        case "setRandomActivity":
            console.log(action.payload)
            return {...state, randomActivity: action.payload}
            
        case "setTypeActivity":
            console.log(action.payload)
            return {...state, typeActivity: action.payload} 
            
        case "setPriceActivity":
            console.log(action.payload)
            return {...state, priceActivity: action.payload} 
            
        case "setFavoriteActivities":
            console.log(state.favoriteActivities)
            return {...state, favoriteActivities: [...state.favoriteActivities , action.payload]} 
            
        case "removeFav":
            console.log(action.payload)
            return {...state, 
                favoriteActivities: state.favoriteActivities.filter((activity) => activity.key != action.payload.key)}

        case "storageFav":
            console.log(state.favoriteActivities);
            return{...state,
            favoriteActivities: action.payload}        

        default:
            return state;    
    }
}

export default Reducer;