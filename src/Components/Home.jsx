import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import {
  storageFav,
  setRandomActivity,
  setTypeActivity,
  setPriceActivity,
  setFavoriteActivities,
  setFavTypes,
  getActiveUser,
  setFavCount,
} from "../actions";
import { Button, Select, Card } from "antd";

function Home() {
  const randomActivity = useSelector((state) => state.randomActivity);
  const typeActivity = useSelector((state) => state.typeActivity);
  const priceActivity = useSelector((state) => state.priceActivity);
  const favActivities = useSelector((state) => state.favoriteActivities);
  const loggedInUser = useSelector((state) => state.loggedInUser);
  const dispatch = useDispatch();
  const [type, setType] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const favTypes = useSelector((state) => state.favTypes);

  const { Option } = Select;

  useEffect(() => {
    const activeUser = localStorage.getItem("user");
    if (activeUser) {
      const foundUser = JSON.parse(activeUser);
      dispatch(getActiveUser(foundUser));
      axios
        .get(`https://boredom-client.herokuapp.com/user/${foundUser.userId}`)
        .then((res) => dispatch(setFavCount(res.data)));
    }
  }, []);

  useEffect(() => {
    const favs = localStorage.getItem("favorites-list");
    const types = localStorage.getItem("favorite-types");
    if (favs) {
      dispatch(storageFav(JSON.parse(favs)));
    }
    if (types) {
      dispatch(setFavTypes(JSON.parse(types)));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("favorites-list", JSON.stringify(favActivities));
    localStorage.setItem("favorite-types", JSON.stringify(favTypes));
  });

  useEffect(() => {
    let mounted = true;

    if (mounted) {
      axios
        .get("https://www.boredapi.com/api/activity/")
        .then((res) => dispatch(setRandomActivity(res.data)));
    }
    return () => {
      mounted = false;
    };
  }, []);

  const generateActivity = () => {
    axios
      .get("https://www.boredapi.com/api/activity/")
      .then((res) => dispatch(setRandomActivity(res.data)));
  };

  const generateByType = () => {
    axios
      .get(`https://www.boredapi.com/api/activity/?type=${type}`)
      .then((res) => dispatch(setTypeActivity(res.data)));
  };

  const generateByPrice = () => {
    axios
      .get(
        `https://www.boredapi.com/api/activity?minprice=${minPrice}&maxprice=${maxPrice}`
      )
      .then((res) => dispatch(setPriceActivity(res.data)));
  };

  return (
    <div className="App">
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Card style={{ width: 300 }}>
          <p>{randomActivity.activity}</p>
        </Card>
        <Button onClick={() => generateActivity()}>
          Generate new activity
        </Button>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h2>Select an activity by type</h2>

        <label htmlFor="types">Choose a type:</label>

        <Select
          style={{ width: 120 }}
          defaultValue={{ value: "pick a type" }}
          onChange={(value) => setType(value)}
          id="types"
        >
          <Option value="charity">charity</Option>
          <Option value="recreational">recreational</Option>
          <Option value="education">education</Option>
          <Option value="social">social</Option>
          <Option value="music">music</Option>
          <Option value="relaxation">relaxation</Option>
        </Select>

        <Button onClick={() => generateByType()}>Generate activity</Button>
        {typeActivity.activity && (
          <Card style={{ width: 300 }}>
            <p>activity: {typeActivity.activity} </p>
            <p>type: {typeActivity.type}</p>
          </Card>
        )}

        {typeActivity.activity && (
          <Button
            onClick={() => {
              loggedInUser.userId
                ? !favActivities.includes(typeActivity)
                  ? dispatch(setFavoriteActivities(typeActivity))
                  : alert("Activity already in favorites!")
                : alert("Please log in to add favorites!");
            }}
          >
            add to favorites
          </Button>
        )}
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div>
          <h2>Generate an activity by price range:</h2>
          <label htmlFor="minPrice">Choose min price:</label>

          <Select
            style={{ width: 70 }}
            defaultValue={{ value: "0" }}
            onChange={(value) => setMinPrice(value)}
            id="minPrice"
          >
            <Option value="0">0</Option>
            <Option value="0.1">0.1</Option>
            <Option value="0.2">0.2</Option>
            <Option value="0.3">0.3</Option>
            <Option value="0.4">0.4</Option>
            <Option value="0.5">0.5</Option>
          </Select>

          <label htmlFor="maxPrice">Choose max price:</label>
          <Select
            style={{ width: 70 }}
            defaultValue={{ value: "0.1" }}
            onChange={(value) => setMaxPrice(value)}
            id="prices"
          >
            <Option value="0.1">0.1</Option>
            <Option value="0.2">0.2</Option>
            <Option value="0.3">0.3</Option>
            <Option value="0.4">0.4</Option>
            <Option value="0.5">0.5</Option>
            <Option value="0.6">0.6</Option>
          </Select>

          <Button onClick={() => generateByPrice()}>Generate activity</Button>
        </div>
        {priceActivity.activity && (
          <Card style={{ width: 300 }}>
            <p>activity: {priceActivity.activity} </p>
            <p>price: {priceActivity.price}</p>
          </Card>
        )}
        {priceActivity.activity && (
          <Button
            onClick={() => {
              loggedInUser.userId
                ? !favActivities.includes(priceActivity)
                  ? dispatch(setFavoriteActivities(priceActivity))
                  : alert("Activity already in favorites!")
                : alert("Please log in to add to favorites!");
            }}
          >
            add to favorites
          </Button>
        )}
      </div>
    </div>
  );
}

export default Home;
