import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Login from "./components/Login.js";
import Home from "./components/Home.js";
import Folder from "./components/Folder.js";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Router>
        <Route exact path="/home" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/folder/:id" component={Folder} />
      </Router>
      <Login />
    </div>
  );
}
export default App;
