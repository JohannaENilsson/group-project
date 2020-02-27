import React from "react";
import { Redirect } from "react-router-dom";

import { token$ } from "./Store";
import Header from "./Header.js";
import Sidebar from "./Sidebar";
import InnerContainer from "./InnerContainer";

export default function Home() {



  return (
    <div>
      <Header />
      <h2 className="pageTitle">Home</h2>
      <div className="outerContainer">
        <div className="sidebarContainer">
          <Sidebar token={token$.value} />
        </div>
        <InnerContainer />
      </div>
    </div>
  );
}
