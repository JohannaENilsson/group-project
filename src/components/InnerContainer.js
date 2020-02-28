import React from "react";
import { Dropbox } from "dropbox";
import { token$ } from "./Store.js";

import GetAllFiles from "../actions/GetAllFiles";
import PopupAddNewFolder from '../actions/PopupAddNewFolder'



export default function InnerContainer() {
  return (
    <div className="innerContainer">

      <h2 className="innerContainerTitle">
        Inner container title <i>(ex Home, eller Home/Undermapp)</i>
      </h2>
      <GetAllFiles />
    </div>
  );
}
