import React from "react";
import Header from "./Header.js";
import Sidebar from "./Sidebar";

export default function Home() {
  return (
    <div>
      <Header />
      <h2 className="homeTitle">Home</h2>
      <div className="outerContainer">
        <div className="sidebarContainer">
          <Sidebar />
        </div>
        <div className="innerContainer"></div>
      </div>
    </div>
  );
}
