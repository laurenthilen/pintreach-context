import React, { useState, useEffect } from "react";
import { Route, Switch, Link, useHistory } from "react-router-dom";
import { PrivateRoute } from "./utils/PrivateRoute";
import { axiosWithAuth } from "./utils/axiosWithAuth";
import { UserContext } from "./contexts/UserContext";
import { BoardContext } from "./contexts/BoardContext";
import axios from "axios";

import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Dashboard from "./components/Dashboard";
import Profile from "./components/Profile";
import Board from "./components/Board";
import Articles from "./components/Articles";
import { useStyles } from "./components/theme";

import logo from "./assets/logo.png";
import { Button } from "@material-ui/core";
import "./App.css";

function App() {
  const [loggedin, setLoggedin] = useState(false);
  const [userInfo, setUserInfo] = useState([]);
  const history = useHistory();
  const classes = useStyles();

  // user info
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

  // articles
  const [articles, setArticles] = useState([]);

  const getArticles = () => {
    axios
      .get("https://newsapi.org/v2/top-headlines?country=us&apiKey=0aff37691fc248aea950f3992e4004a0")
      .then(res => setArticles(res.data))
      .catch(err => console.log(err));
  };

  useEffect(() => {
    getArticles();
  }, [articles]);

  return (
    <UserContext.Provider value={{ userInfo }}>
      <BoardContext.Provider value = {{ boards, fetchBoards, isUpdated, setIsUpdated, articles }}>
        <div className="App">
          <nav>
            <div className="navbar-left">
              <img src={logo} alt="logo" width="50px" height="50px" />
              <h1 style={{ marginLeft:"8px" }}>Pintreach</h1>
            </div>
            {loggedin ? (
              <div className="navbar-right">
                 <Button className={classes.btn3}>
                  <Link to="/articles" className="nav-link">
                    Articles
                  </Link>
                </Button>
                <Button className={classes.btn3}>
                  <Link to="/dashboard" className="nav-link">
                    Dashboard
                  </Link>
                </Button>
                <Button className={classes.btn3}>
                  <Link to="/profile" className="nav-link">
                    Profile
                  </Link>
                </Button>
                <Button className={classes.btn3} onClick={logout}>
                  <Link className="nav-link">
                    Logout
                  </Link>
                </Button>
              </div>
            ) : (
              <div className="navbar-right">
                <Button className={classes.btn3}>
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
            <PrivateRoute exact path="/dashboard" component={Dashboard}/>
            <PrivateRoute exact path="/profile" component={Profile} />
            <PrivateRoute exact path="/board/:boardid" component={Board} />
            <PrivateRoute exact path="/articles" component={Articles} />
          </Switch>
        </div>
      </BoardContext.Provider>
    </UserContext.Provider>
  );
}

export default App;
