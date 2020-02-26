import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Login from "./components/Login.js";
import Home from "./components/Home.js";
import Folder from "./components/Folder.js";
import Auth from "./components/Auth.js";


import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Route path="/auth" component={Auth} />
        <Route exact path="/home" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/folder/:id" component={Folder} />
        <Login />
      </div>
    </Router>
  );
}
export default App;
