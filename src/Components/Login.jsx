import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { getActiveUser, logout, setFavCount } from "../actions";

function Login() {
  const [user, setUser] = useState({});
  const loggedInUser = useSelector((state) => state.loggedInUser);
  const dispatch = useDispatch();
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const activeUser = localStorage.getItem("user");
    if (activeUser) {
      const foundUser = JSON.parse(activeUser);
      dispatch(getActiveUser(foundUser));
      axios
        .get(`https://boredom-client.herokuapp.com/user/${foundUser.userId}`)
        .then((res) => {
          setUser(res.data);
          dispatch(setFavCount(res.data));
        });
    }
  }, []);

  const handleSubmit = (e) => {
    const user = { email, password };
    e.preventDefault();

    axios
      .post("https://boredom-client.herokuapp.com/login", user)
      .then((res) => {
        dispatch(getActiveUser(res.data));
        navigate("/");
        localStorage.setItem("user", JSON.stringify(res.data));
        axios
          .get(`https://boredom-client.herokuapp.com/user/${res.data.userId}`)
          .then((res) => {
            setUser(res.data);
            dispatch(setFavCount(res.data));
          });
      })
      .catch((err) => console.log(err));
  };

  const handleLogout = () => {
    setUser({});
    dispatch(logout());
    setEmail("");
    setPassword("");
    localStorage.clear();
  };

  if (user.email) {
    return (
      <div>
        {user.email} is loggged in
        <button onClick={handleLogout}>logout</button>
        <div>
          {user.favList.map((item) => {
            return <li key={item._id}>{item.activity}</li>;
          })}
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <form
        style={{ display: "flex", flexDirection: "column", width: "50%" }}
        onSubmit={(e) => handleSubmit(e)}
      >
        <h1>Log in : </h1>
        <input
          onChange={({ target }) => setEmail(target.value)}
          type="email"
          placeholder="enter your email"
          value={email}
        />
        <input
          onChange={({ target }) => setPassword(target.value)}
          type="password"
          placeholder="enter your password"
          value={password}
        />
        <input value="Login" type="submit" />
      </form>
    </div>
  );
}

export default Login;
