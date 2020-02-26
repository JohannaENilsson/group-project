import React from "react";
import { updateToken } from './Store';


export default function Button() {
  
  function handleLogout(){
    updateToken(null);
  }

  return (
    <div>
      <button className="button" onClick={handleLogout}>
        Log out
      </button>
    </div>
  );
}
