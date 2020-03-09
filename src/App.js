import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Redirect } from "react-router-dom";

import Login from "./components/Login.js";
import Home from "./components/Home.js";
import Auth from "./actions/Auth.js";

import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Route exact path="/">
          <Redirect to="/login" />
        </Route>
        
        <Route path="/home" component={Home} />
        <Route path="/auth" component={Auth} />
        <Route path="/login" component={Login} />
      </div>
    </Router>
  );
}
export default App;

