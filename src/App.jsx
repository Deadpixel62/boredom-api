import "./App.css";
import Home from "./Components/Home";
import Favorites from "./Components/Favorites";
import { Routes, Route, Link } from "react-router-dom";
import "../node_modules/antd/dist/antd.css";
import { Badge } from "antd";
import { useSelector, useDispatch } from "react-redux";
import Login from "./Components/Login";
import Register from "./Components/Register";
import { getActiveUser, setFavCount } from "./actions";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const dispatch = useDispatch();
  const favCounter = useSelector((state) => state.favCount);
  const [user, setUser] = useState();

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

  return (
    <div>
      <nav
        style={{
          paddingTop: "2vh",
          display: "flex",
          justifyContent: "flex-end",
          gap: "12px",
        }}
      >
        <div>
          <Link className="lnk" to="/">
            Home{" "}
          </Link>
          <Badge count={favCounter}>
            <Link className="lnk" to="/favorites">
              Favorites{" "}
            </Link>
          </Badge>
        </div>
        <Link className="lnk" to="/login">
          Log in{" "}
        </Link>
        <Link className="lnk" to="/register">
          Register{" "}
        </Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
