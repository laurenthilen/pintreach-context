import React, { useState, useEffect } from "react";
import { Route, Switch, Link, useHistory } from "react-router-dom";
import { PrivateRoute } from "./utils/PrivateRoute";
import { axiosWithAuth } from "./utils/axiosWithAuth";
import { UserContext } from "./contexts/UserContext";
import { BoardContext } from "./contexts/BoardContext";

import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Dashboard from "./components/Dashboard";
import Profile from "./components/Profile";

import logo from "./assets/logo.png";
import { Button } from "@material-ui/core";
import "./App.css";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  btn: {
      background: "rgb(8, 232, 222)",
      color: "black",
      marginLeft: "20px"
  },
  btn2: {
    background: "rgb(216, 216, 216)",
    color: "black",
    marginLeft: "20px"
  }
}));

function App() {
  const [loggedin, setLoggedin] = useState(false);
  const [userInfo, setUserInfo] = useState([]);
  const history = useHistory();
  const classes = useStyles();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      axiosWithAuth()
        .get("/users/myinfo")
        .then(res => {
          setUserInfo(res.data);
          console.log(userInfo)
          history.push("/dashboard")
        })
        .catch(err => {
          console.log(err);
        });
    }
  }, [loggedin]);

  const logout = () => {
    localStorage.removeItem("token");
    setLoggedin(false);
  };

  // boards
  const [boards, setBoards] = useState([]);
  const [isUpdated, setIsUpdated] = useState(false)

  const fetchBoards = () => {
    if (localStorage.getItem("token")) {
      axiosWithAuth()
          .get("/boards/boards")
          .then((res) => {
            setBoards(res.data)
            console.log(boards)
            setIsUpdated(false)
          })
          .catch((err) => console.log(err.response));
    }
  };

  useEffect(() => {
      fetchBoards();
  }, [isUpdated]);

  return (
    <UserContext.Provider value={{ userInfo }}>
      <BoardContext.Provider value = {{ boards, fetchBoards, isUpdated, setIsUpdated }}>
        <div className="App">
          <nav>
            <div className="navbar-left">
              <img src={logo} alt="logo" width="50px" height="50px" />
              <h1 style={{ marginLeft:"8px" }}>Pintreach</h1>
            </div>
            {loggedin ? (
              <div className="navbar-right">
                <Button className={classes.btn}>
                  <Link to="/dashboard" className="nav-link">
                    Dashboard
                  </Link>
                </Button>
                <Button className={classes.btn2}>
                  <Link to="/profile" className="nav-link">
                    Profile
                  </Link>
                </Button>
                <button onClick={logout}>Logout</button>
              </div>
            ) : (
              <div className="navbar-right">
                <Button className={classes.btn}>
                  <Link to="/login" className="nav-link">
                    Login
                  </Link>
                </Button>
                <Button className={classes.btn2}>
                  <Link to="/signup" className="nav-link">
                    Sign Up
                  </Link>
                </Button>
              </div>
            )}
          </nav>

          <Switch>
            <Route exact path="/login" render={props => <Login setLoggedin={setLoggedin} />}  />
            <Route exact path="/signup" component={SignUp} />
            <PrivateRoute exact path="/dashboard" component={Dashboard} />
            <PrivateRoute exact path="/profile" component={Profile} />
          </Switch>
        </div>
      </BoardContext.Provider>
    </UserContext.Provider>
  );
}

export default App;
