import React from "react";
import { Dropbox } from "dropbox";
import { token$ } from "./Store.js";
import AddFile from "../actions/AddFile";
import GetAllFiles from "../actions/GetAllFiles";



export default function InnerContainer() {
  // hämtas
  // renderas ut & mappas

 

  return (
    <div className="innerContainer">
      <h2>Inner container title</h2>
       <AddFile />
       <GetAllFiles />


    </div>
  );
}
