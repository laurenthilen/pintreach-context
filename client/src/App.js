import React, { useState, useEffect } from "react";
import { Route, Switch, Link, useHistory } from "react-router-dom";
import { PrivateRoute } from "./utils/PrivateRoute";
import { axiosWithAuth } from "./utils/axiosWithAuth";
import { UserContext } from "./contexts/context";

import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Dashboard from "./components/Dashboard";
import Profile from "./components/Profile";

import "./App.css";

function App() {
  const [loggedin, setLoggedin] = useState(false);
  const [userInfo, setUserInfo] = useState({ id: "" });
  const history = useHistory();

  useEffect(() => {
    if (loggedin) {
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

  return (
    <UserContext.Provider value={{ userInfo }}>
      <div className="App">
        <nav>
          <p>Logo Here</p>
          {loggedin ? (
            <div className="navbar">
              <Link to="/dashboard" className="nav-link">
                Dashboard
              </Link>
              <Link to="/profile" className="nav-link">
                Profile
              </Link>
              <button onClick={logout}>Logout</button>
            </div>
          ) : (
            <div className="navbar">
              <Link to="/login" className="nav-link">
                Login
              </Link>
              <Link to="/signup" className="nav-link">
                Sign Up
              </Link>
            </div>
          )}
        </nav>

        <Switch>
          <Route exact path="/login" render={props => <Login setLoggedin={setLoggedin} />}  />
          <Route exact path="/signup" component={SignUp} />
          <PrivateRoute exact path="/dashboard" component={Dashboard} />
          <PrivateRoute exact path="/profile" component={() => <Profile userInfo={userInfo} />} />
        </Switch>
      </div>
    </UserContext.Provider>
  );
}

export default App;
