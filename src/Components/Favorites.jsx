import React from "react";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { storageFav, removeFav, setFavTypes } from "../actions";
import { Button, Select, Input } from "antd";
import axios from "axios";

function Favorites() {
  const favActivities = useSelector((state) => state.favoriteActivities);
  const favTypes = useSelector((state) => state.favTypes);
  const [filteredFav, setFilteredFav] = useState(favActivities);
  const dispatch = useDispatch();
  const [searchValue, setSearchValue] = useState("");
  const [filteredType, setFilteredType] = useState("");
  const [user, setUser] = useState({});
  const loggedInUser = useSelector((state) => state.loggedInUser);
  const { Option } = Select;

  useEffect(() => {
    const activeUser = localStorage.getItem("user");
    if (activeUser) {
      const foundUser = JSON.parse(activeUser);
      axios
        .get(`https://boredom-client.herokuapp.com/user/${foundUser.userId}`)
        .then((res) => dispatch(storageFav(res.data.favList)));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("favorites-list", JSON.stringify(favActivities));
    localStorage.setItem("favorite-types", JSON.stringify(favTypes));
  });

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      setFilteredFav(favActivities);
    }
    return () => {
      mounted = false;
    };
  }, [favActivities]);

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Favorite Activities:</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (searchValue.trim(" ").length === 0) {
            setFilteredFav(favActivities);
          } else {
            setFilteredFav(
              favActivities.filter((item) => {
                console.log(item);
                return item.activity
                  .toLowerCase()
                  .includes(searchValue.toLowerCase());
              })
            );
          }
        }}
      >
        <Input
          allowClear
          style={{
            width: 200,
          }}
          value={searchValue}
          title="Type an activity name"
          placeholder="Search by activity name"
          onChange={(e) => setSearchValue(e.target.value)}
          type="text"
        />
        <Input value="search" style={{ width: 130 }} type="submit" />
      </form>

      <form
        id="typeForm"
        onSubmit={(e) => {
          e.preventDefault();
          setFilteredFav(favActivities);
          setFilteredFav(
            favActivities.filter((item) => {
              return item.type.toLowerCase().includes(filteredType);
            })
          );
        }}
      >
        Filter by type
        <Select
          style={{ width: 140 }}
          onSelect={(e) => console.log(e)}
          form="typeForm"
          onChange={(value) => setFilteredType(value)}
          id="types"
        >
          {favTypes.map((item) => {
            return (
              <Option key={item._id} value={item}>
                {" "}
                {item}{" "}
              </Option>
            );
          })}
        </Select>
        <Input style={{ width: 60 }} value="Filter" type="submit" />
        <Button onClick={() => setFilteredFav(favActivities)}>
          Reset filter
        </Button>
      </form>

      {favActivities[0] ? (
        <ul style={{ marginTop: "1rem" }}>
          {filteredFav.map((item) => {
            return (
              <li
                key={item._id}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  backgroundColor: "#f5f5f5",
                  marginBottom: "4px",
                  alignItems: "center",
                  paddingLeft: "6px",
                }}
              >
                {item.activity}{" "}
                <Button
                  style={{ width: 100 }}
                  onClick={() => dispatch(removeFav(item))}
                >
                  Delete
                </Button>
              </li>
            );
          })}
        </ul>
      ) : loggedInUser.userId ? (
        "Add activities to your favorites."
      ) : (
        "Please log in to add activities to your favorites."
      )}
    </div>
  );
}

export default Favorites;
