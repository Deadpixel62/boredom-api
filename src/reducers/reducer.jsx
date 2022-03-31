import axios from "axios";
import {
  GETACTIVEUSER,
  LOGOUT,
  SETFAVCOUNT,
  SETRANDOMACTIVITY,
  SETTYPEACTIVITY,
  SETPRICEACTIVITY,
  SETFAVORITEACTIVITIES,
  REMOVEFAV,
  STORAGEFAV,
  SETFAVTYPES,
} from "../constants";

const initialState = {
  randomActivity: {},
  typeActivity: {},
  priceActivity: {},
  favoriteActivities: [],
  favTypes: [],
  loggedInUser: {},
  favCount: 0,
};

const Reducer = (state = initialState, action) => {
  let myToken = state.loggedInUser.token;

  switch (action.type) {
    case GETACTIVEUSER:
      return { ...state, loggedInUser: action.payload };

    case LOGOUT:
      return {
        ...state,
        loggedInUser: {},
        favCount: 0,
        favoriteActivities: [],
      };

    case SETFAVCOUNT:
      return { ...state, favCount: action.payload.favList.length };

    case SETRANDOMACTIVITY:
      return { ...state, randomActivity: action.payload };

    case SETTYPEACTIVITY:
      return { ...state, typeActivity: action.payload };

    case SETPRICEACTIVITY:
      return { ...state, priceActivity: action.payload };

    case SETFAVORITEACTIVITIES:
      axios
        .post("https://boredom-client.herokuapp.com/addFav", action.payload, {
          headers: { Authorization: `Bearer ${myToken}` },
        })
        .then((res) => console.log(res))
        .catch((err) => console.log(err));

      return {
        ...state,
        favoriteActivities: [...state.favoriteActivities, action.payload],
        favCount: state.favCount + 1,
      };

    case REMOVEFAV:
      const user = { activityId: action.payload._id };
      console.log(user);
      axios
        .delete(`https://boredom-client.herokuapp.com/deleteFav`, {
          headers: { Authorization: `Bearer ${myToken}` },
          data: user,
        })
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
      return {
        ...state,
        favoriteActivities: state.favoriteActivities.filter(
          (activity) => activity._id != action.payload._id
        ),
        favTypes: state.favTypes.filter((item) => item != action.payload.type),
        favCount: state.favCount - 1,
      };

    case STORAGEFAV:
      return { ...state, favoriteActivities: action.payload };

    case SETFAVTYPES:
      return { ...state, favTypes: action.payload };

    default:
      return state;
  }
};

export default Reducer;
