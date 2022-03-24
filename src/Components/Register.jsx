import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Register() {
  const [user, setUser] = useState({ email: "", password: "" });
  const [loggedIn, setloggedIn] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    const activeUser = localStorage.getItem("user");
    if (activeUser) {
      const foundUser = JSON.parse(activeUser);
      dispatch(getActiveUser(foundUser));
      axios
        .get(`http://localhost:5000/user/${foundUser.userId}`)
        .then((res) => setloggedIn(res.data));
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/signup", user)
      .then((res) => navigate("/login"));
  };

  const handleLogout = () => {
    setloggedIn();
    dispatch(logout());
    localStorage.clear();
  };

  if (loggedIn) {
    return (
      <div>
        {loggedIn.email} is logged in, please logout to register a new account.
        <button onClick={handleLogout}>logout</button>
      </div>
    );
  }

  return (
    <div>
      <form
        style={{ display: "flex", flexDirection: "column", width: "50%" }}
        onSubmit={(e) => handleSubmit(e)}
      >
        <h1>Register : </h1>
        <input
          onChange={({ target }) => setUser({ ...user, email: target.value })}
          type="email"
          placeholder="enter your email"
          required
        />
        <input
          onChange={({ target }) =>
            setUser({ ...user, password: target.value })
          }
          type="password"
          placeholder="enter your password"
          required
        />
        <input value="Register" type="submit" />
      </form>
    </div>
  );
}

export default Register;
