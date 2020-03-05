import React, { useState } from "react";

export default function Search() {



  return (
    <div className="searchInputDiv">
      <input
        type="text"
        name="search"
        className="searchInput"
        placeholder="Search"
        //onChange={}
      />
      <i className="fa fa-search"></i>
    </div>
  );
}
