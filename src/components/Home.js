import React from "react";

import Header from "./Header.js";
import Sidebar from "./Sidebar";
import InnerContainer from "./InnerContainer"

export default function Home() {
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
