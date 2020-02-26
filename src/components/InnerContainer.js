import React from "react";
import { Dropbox } from "dropbox";
import { token$ } from "./Store.js";
import GetAllFiles from "../actions/GetAllFiles";



export default function InnerContainer() {
  // hämtas
  // renderas ut & mappas

 

  return (
    <div className="innerContainer">
      <h2>Inner container title</h2>
       <GetAllFiles />


    </div>
  );
}
