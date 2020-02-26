import React from "react";
import { Redirect } from "react-router-dom";

import { token$ } from "./Store";
import Header from "./Header.js";
import Sidebar from "./Sidebar";
import InnerContainer from "./InnerContainer";

export default function Home() {
  // if (token$ === null) {
  //   return <Redirect to={"/login"} />;
  // }

  return (
    <div>
      <Header />
      <h2 className="homeTitle">Home</h2>
      <div className="outerContainer">
        <div className="sidebarContainer">
          <Sidebar />
        </div>
        <InnerContainer />
      </div>
    </div>
  );
}
