import axios from "axios";

const initialState = {
  randomActivity: {},
  typeActivity: {},
  priceActivity: {},
  favoriteActivities: [],
  favTypes: [],
  loggedInUser: {},
  favCount: 0,
};

const myData = function (data) {
  let myId;
  myId = data.newFav._id;
  console.log(myId);
  return myId;
};

const Reducer = (state = initialState, action) => {
  let myToken = state.loggedInUser.token;

  switch (action.type) {
    case "getActiveUser":
      console.log(action);
      return { ...state, loggedInUser: action.payload };

    case "logout":
      return { ...state, loggedInUser: {}, favCount: 0 };

    case "setFavCount":
      console.log(action);
      return { ...state, favCount: action.payload.favList.length };

    case "setRandomActivity":
      console.log(action.payload);
      return { ...state, randomActivity: action.payload };

    case "setTypeActivity":
      console.log(action.payload);
      return { ...state, typeActivity: action.payload };

    case "setPriceActivity":
      console.log(action.payload);
      return { ...state, priceActivity: action.payload };

    case "setFavoriteActivities":
      axios
        .post("http://localhost:5000/addFav", action.payload, {
          headers: { Authorization: `Bearer ${myToken}` },
        })
        .then((res) => {
          let activityId = myData(res.data);
          let user = {
            userId: state.loggedInUser.userId,
            activityId,
          };
          console.log(user);
          axios
            .put(`http://localhost:5000/users/addFavorite`, user, {
              headers: { Authorization: `Bearer ${myToken}` },
            })
            .then((res) => console.log(res))
            .catch((err) => console.log(err));
        })
        .catch((err) => console.log(err));

      return {
        ...state,
        favoriteActivities: [...state.favoriteActivities, action.payload],
        favCount: state.favCount + 1,
      };

    case "removeFav":
      console.log("===========================");
      console.log(state.loggedInUser);

      const user = {
        userId: state.loggedInUser.userId,
        activityId: action.payload._id,
      };

      console.log(user);
      axios
        .delete(`http://localhost:5000/users/removeFav`, {
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

    case "storageFav":
      console.log(state.favoriteActivities);
      return { ...state, favoriteActivities: action.payload };

    case "setFavTypes":
      console.log(action.payload);
      return { ...state, favTypes: action.payload };

    default:
      return state;
  }
};

export default Reducer;
