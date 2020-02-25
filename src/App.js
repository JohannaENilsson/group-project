import React from 'react';

import Login from './components/Login';
import Home from './components/Home';
import Folder from './components/Folder'

import './App.css';

function App() {
  return (
    <div className="App">

      <Login />
      <Home />
      <Folder />
      
    </div>
  );
}

export default App;
