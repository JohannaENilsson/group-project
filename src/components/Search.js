import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";

export default function Search({ searchFilesAndFolders, query }) {
  const [searchInput, setsearchInput] = useState("");

  useEffect(() => {
    searchFilesAndFolders(searchInput);
  }, [searchInput]);

  const onChangeSearch = e => {
    setsearchInput(e.target.value);
  };

  return (
    
      <div className="searchInputDiv">
        <input
          type="text"
          name="search"
          className="searchAndAddNewFolderInput"
          placeholder="Search"
          value={searchInput}
          onChange={onChangeSearch}
        />
        <FaSearch className="search" />
      </div>
    
  );
}
