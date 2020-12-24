import React from "react";
import { Route, Switch, Link } from "react-router-dom";
import { privateRoute } from "./utils/privateRoute";

import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Dashboard from "./components/Dashboard";
import Profile from "./components/Profile";

import "./App.css";

function App() {

  const logout = () => {
    localStorage.removeItem("token");
  };

  return (
    <div className="App">
      <nav>
        <p>Logo Here</p>
        {localStorage.getItem("token") ? (
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
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={SignUp} />
        <privateRoute exact path="/dashboard" component={Dashboard} />
        <privateRoute exact path="/profile" component={Profile} />
      </Switch>
    </div>
  );
}

export default App;
