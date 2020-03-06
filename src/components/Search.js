import React, { useState } from "react";
import { FaSearch } from 'react-icons/fa';

export default function Search({ searchFilesAndFolders }) {
  const [searchInput, setsearchInput] = useState("");

  const onChangeSearch = (e) => {
    setsearchInput(e.target.value);
    searchFilesAndFolders(searchInput);
  }


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
